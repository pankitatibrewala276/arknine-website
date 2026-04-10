import { blogPosts as fallbackPosts, getPostBySlug as fallbackGetBySlug, getRelatedPosts as fallbackRelated, type BlogPost } from "@/data/blog";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiPeopleProfile {
  id: number;
  documentId: string;
  Name: string;
  Designation: string;
  Linkedin: string | null;
  Bio: string | null;
  displayOrder: number | null;
  active: boolean | null;
  hasProfilePage: boolean | null;
  slug: string;
  category:
    | "bord of directors"
    | "kpm"
    | "governance"
    | "audit"
    | "nrc"
    | "stakeholder"
    | "csr"
    | null;
  picture: {
    url: string;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    } | null;
  } | null;
}

export type TeamMemberType =
  | "board"
  | "kmp"
  | "governance"
  | "audit"
  | "nrc"
  | "stakeholder"
  | "csr";

export interface TeamMemberFromCMS {
  name: string;
  slug: string;
  role: string;
  bio: string;
  initials: string;
  imageSrc: string | null;
  linkedin: string | null;
  type: TeamMemberType;
  displayOrder: number;
  /** When false, the member's portrait should not link to a profile page. */
  hasProfilePage: boolean;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function resolveImageUrl(picture: StrapiPeopleProfile["picture"]): string | null {
  if (!picture) return null;
  const url =
    picture.formats?.medium?.url ||
    picture.formats?.small?.url ||
    picture.url;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

function mapCategory(category: StrapiPeopleProfile["category"]): TeamMemberType | null {
  switch (category) {
    case "bord of directors":
      return "board";
    case "kpm":
      return "kmp";
    case "governance":
      return "governance";
    case "audit":
      return "audit";
    case "nrc":
      return "nrc";
    case "stakeholder":
      return "stakeholder";
    case "csr":
      return "csr";
    default:
      return null;
  }
}

function toTeamMember(profile: StrapiPeopleProfile): TeamMemberFromCMS | null {
  const type = mapCategory(profile.category);
  if (!type) return null;

  return {
    name: profile.Name,
    slug: profile.slug,
    role: profile.Designation,
    bio: profile.Bio || "",
    initials: getInitials(profile.Name),
    imageSrc: resolveImageUrl(profile.picture),
    linkedin: profile.Linkedin || null,
    type,
    displayOrder: profile.displayOrder ?? 999,
    hasProfilePage: profile.hasProfilePage ?? false,
  };
}

/**
 * Permissive active filter — Strapi's `$ne=false` doesn't match null, so
 * we use an `$or` between `active === true` and `active IS NULL`. New CMS
 * entries (with `active = null` by default) are visible; only explicit
 * `active = false` hides a record.
 */
const ACTIVE_OR_NULL =
  "filters[$or][0][active][$eq]=true&filters[$or][1][active][$null]=true";

export async function fetchTeamMembers(): Promise<TeamMemberFromCMS[]> {
  const url = `${STRAPI_URL}/api/people-profiles?${ACTIVE_OR_NULL}&populate=picture&sort=displayOrder:asc&pagination[pageSize]=100`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    console.error("Failed to fetch people profiles from Strapi:", res.status);
    return [];
  }

  const json = await res.json();
  const profiles: StrapiPeopleProfile[] = json.data;

  return profiles
    .map(toTeamMember)
    .filter((m): m is TeamMemberFromCMS => m !== null)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function fetchTeamMemberBySlug(
  slug: string
): Promise<TeamMemberFromCMS | null> {
  const url = `${STRAPI_URL}/api/people-profiles?filters[slug][$eq]=${encodeURIComponent(slug)}&${ACTIVE_OR_NULL}&populate=picture`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;

  const json = await res.json();
  const profiles: StrapiPeopleProfile[] = json.data;
  if (!profiles || profiles.length === 0) return null;

  return toTeamMember(profiles[0]);
}

export async function fetchAllSlugs(): Promise<string[]> {
  const url = `${STRAPI_URL}/api/people-profiles?${ACTIVE_OR_NULL}&fields[0]=slug&pagination[pageSize]=100`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];

  const json = await res.json();
  return json.data.map((p: { slug: string }) => p.slug);
}

/* ================================================================== */
/*  POSTS (Blog & PR)                                                  */
/* ================================================================== */

/** Raw shape from Strapi REST API */
interface StrapiPost {
  id: number;
  documentId: string;
  Title: string;
  slug: string;
  excerpt: string | null;
  readTime: number | null;
  type: "Blog" | "Press Relaese" | "Event" | null;
  author: string | null;
  publishDate: string | null;
  featured: boolean | null;
  active: boolean | null;
  content: StrapiBlock[] | string | null;
  coverImage: {
    url: string;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    } | null;
  } | null;
}

/* ------------------------------------------------------------------ */
/*  Strapi Blocks → HTML renderer                                       */
/* ------------------------------------------------------------------ */
interface StrapiBlock {
  type: string;
  children?: StrapiInline[];
  level?: number;
  format?: string;
  image?: { url: string; alternativeText?: string };
}

interface StrapiInline {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
  children?: StrapiInline[];
}

function renderInline(node: StrapiInline): string {
  if (node.type === "link" && node.url) {
    const inner = (node.children || []).map(renderInline).join("");
    return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
  }
  let text = node.text || "";
  // Escape basic HTML
  text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  if (node.bold) text = `<strong>${text}</strong>`;
  if (node.italic) text = `<em>${text}</em>`;
  if (node.underline) text = `<u>${text}</u>`;
  if (node.strikethrough) text = `<s>${text}</s>`;
  if (node.code) text = `<code>${text}</code>`;
  return text;
}

function blocksToHtml(blocks: StrapiBlock[] | null): string {
  if (!blocks || blocks.length === 0) return "";

  return blocks
    .map((block) => {
      const children = (block.children || []).map(renderInline).join("");

      switch (block.type) {
        case "paragraph":
          return children.trim() ? `<p>${children}</p>` : "";
        case "heading": {
          const tag = `h${block.level || 2}`;
          return `<${tag}>${children}</${tag}>`;
        }
        case "list": {
          const tag = block.format === "ordered" ? "ol" : "ul";
          return `<${tag}>${children}</${tag}>`;
        }
        case "list-item":
          return `<li>${children}</li>`;
        case "quote":
          return `<blockquote>${children}</blockquote>`;
        case "code":
          return `<pre><code>${children}</code></pre>`;
        case "image": {
          if (!block.image) return "";
          const src = block.image.url.startsWith("http")
            ? block.image.url
            : `${STRAPI_URL}${block.image.url}`;
          const alt = block.image.alternativeText || "";
          return `<img src="${src}" alt="${alt}" loading="lazy" />`;
        }
        default:
          return children ? `<p>${children}</p>` : "";
      }
    })
    .filter(Boolean)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/*  Map Strapi type enum → our category                                 */
/* ------------------------------------------------------------------ */
function mapPostCategory(type: StrapiPost["type"]): BlogPost["category"] {
  if (type === "Press Relaese") return "PR";
  if (type === "Event") return "Event";
  return "Blog";
}

/* ------------------------------------------------------------------ */
/*  Map Strapi post → BlogPost                                          */
/* ------------------------------------------------------------------ */
function resolvePostImage(coverImage: StrapiPost["coverImage"]): string {
  if (!coverImage) return "https://picsum.photos/seed/arknine-placeholder/1200/680";
  const url =
    coverImage.formats?.large?.url ||
    coverImage.formats?.medium?.url ||
    coverImage.formats?.small?.url ||
    coverImage.url;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Resolve content — handles three cases:
 * 1. Raw HTML string (pass through directly)
 * 2. Strapi blocks array (convert to HTML)
 * 3. null/undefined (empty string)
 */
function resolveContent(content: StrapiBlock[] | string | null | undefined): string {
  if (!content) return "";
  // If it's already an HTML string, pass through
  if (typeof content === "string") return content;
  // If it's an array, treat as Strapi blocks
  if (Array.isArray(content)) return blocksToHtml(content);
  return "";
}

function toPost(entry: StrapiPost): BlogPost {
  return {
    id: String(entry.id),
    slug: entry.slug,
    title: entry.Title,
    category: mapPostCategory(entry.type),
    tags: [],
    date: entry.publishDate || new Date().toISOString().split("T")[0],
    readTime: entry.readTime || 3,
    image: resolvePostImage(entry.coverImage),
    excerpt: entry.excerpt || "",
    content: resolveContent(entry.content),
    featured: entry.featured ?? false,
  };
}

/* ------------------------------------------------------------------ */
/*  Public fetch functions (with fallback to dummy data)                 */
/* ------------------------------------------------------------------ */
export async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const url = `${STRAPI_URL}/api/posts?filters[active][$eq]=true&populate=coverImage&sort=publishDate:desc&pagination[pageSize]=100`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    const posts: StrapiPost[] = json.data;
    if (!posts || posts.length === 0) return fallbackPosts;
    return posts.map(toPost);
  } catch {
    // Strapi unavailable — use dummy data
    return fallbackPosts;
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const url = `${STRAPI_URL}/api/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[active][$eq]=true&populate=coverImage`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    const posts: StrapiPost[] = json.data;
    if (!posts || posts.length === 0) return fallbackGetBySlug(slug) || null;
    return toPost(posts[0]);
  } catch {
    return fallbackGetBySlug(slug) || null;
  }
}

export async function fetchAllPostSlugs(): Promise<string[]> {
  try {
    const url = `${STRAPI_URL}/api/posts?filters[active][$eq]=true&fields[0]=slug&pagination[pageSize]=100`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Strapi ${res.status}`);
    const json = await res.json();
    return json.data.map((p: { slug: string }) => p.slug);
  } catch {
    return fallbackPosts.map((p) => p.slug);
  }
}

/* ================================================================== */
/*  ARK DOCUMENTS (Policies, Results, Announcements, etc.)             */
/* ================================================================== */

export type ArkDocumentType =
  | "Announcement"
  | "Policy"
  | "Shareholder's Letters and Results"
  | "Earnings Call Replay"
  | "Earnings Call Transcript"
  | "KPI Data Book"
  | "Annual Report"
  | "Shareholding Pattern"
  | "Others"
  | "Archive";

export interface ArkDocument {
  id: string;
  title: string;
  documentUrl: string;
  documentType: ArkDocumentType | null;
  year: number | null;
  duration: "HY1" | "HY2" | null;
  fileExt: string | null;
  fileSizeKb: number | null;
  /** User-set filing date (preferred) or Strapi auto-publishedAt fallback. */
  date: string | null;
}

interface StrapiArkDocument {
  id: number;
  documentId: string;
  Title: string;
  year: number | null;
  duration: "HY1" | "HY2" | null;
  document_type: ArkDocumentType | null;
  active: boolean | null;
  publishDate: string | null;
  publishedAt: string | null;
  document: {
    url: string;
    ext?: string;
    size?: number;
    name?: string;
  } | null;
}

function resolveDocumentUrl(doc: StrapiArkDocument["document"]): string {
  if (!doc) return "";
  if (doc.url.startsWith("http")) return doc.url;
  return `${STRAPI_URL}${doc.url}`;
}

function toArkDocument(entry: StrapiArkDocument): ArkDocument {
  return {
    id: String(entry.id),
    title: entry.Title,
    documentUrl: resolveDocumentUrl(entry.document),
    documentType: entry.document_type,
    year: entry.year,
    duration: entry.duration,
    fileExt: entry.document?.ext?.replace(".", "").toUpperCase() ?? null,
    fileSizeKb: entry.document?.size ?? null,
    date: entry.publishDate ?? entry.publishedAt,
  };
}

/**
 * Fetch documents from the arkDocuments collection (Strapi `results` API).
 * Pass a single documentType, an array of types, or omit to fetch all active.
 * Multi-type queries use Strapi's `$in` filter.
 * `sort` defaults to "Title:asc" — pass "publishDate:desc" for time-ordered lists.
 */
export async function fetchArkDocuments(
  documentType?: ArkDocumentType | ArkDocumentType[],
  sort: string = "Title:asc"
): Promise<ArkDocument[]> {
  try {
    const params = new URLSearchParams();
    params.set("filters[active][$eq]", "true");
    if (Array.isArray(documentType)) {
      documentType.forEach((t, i) => {
        params.set(`filters[document_type][$in][${i}]`, t);
      });
    } else if (documentType) {
      params.set("filters[document_type][$eq]", documentType);
    }
    params.set("populate", "document");
    params.set("sort", sort);
    params.set("pagination[pageSize]", "200");

    const url = `${STRAPI_URL}/api/results?${params.toString()}`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Strapi ${res.status}`);

    const json = await res.json();
    const entries: StrapiArkDocument[] = json.data ?? [];
    return entries.map(toArkDocument).filter((d) => d.documentUrl);
  } catch {
    return [];
  }
}

export async function fetchRelatedPosts(post: BlogPost, count = 2): Promise<BlogPost[]> {
  // Fetch all posts and find related by category match
  const all = await fetchPosts();
  return all
    .filter((p) => p.id !== post.id)
    .sort((a, b) => {
      const aMatch = a.category === post.category ? 1 : 0;
      const bMatch = b.category === post.category ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, count);
}
