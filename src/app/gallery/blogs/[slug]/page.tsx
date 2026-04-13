import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { fetchPostBySlug, fetchAllPostSlugs, fetchRelatedPosts } from "@/lib/strapi";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { BlogArticleImage } from "@/components/sections/BlogArticleImage";
import { HeroGradient } from "@/components/sections/HeroGradient";

/* ------------------------------------------------------------------ */
/*  Static params                                                       */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  const slugs = await fetchAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Arknine Technologies`,
    description: post.excerpt,
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  const related = await fetchRelatedPosts(post, 2);

  return (
    <>
      {/* ============================================================
          HERO
          ============================================================ */}
      <section className="blog-article-hero">
        <HeroGradient />
        <div className="page-wrapper">
          <div className="blog-article-hero__inner">
            {/* Back button */}
            <RevealOnScroll>
              <Link href="/gallery/blogs" className="blog-back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10 3L5 8l5 5" />
                </svg>
                Back to Blog & PR
              </Link>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <div className="blog-article-hero__meta">
                <span className={`blog-cat-badge blog-cat-badge--${post.category}`}>
                  {post.category}
                </span>
                <span className="blog-meta-sep" style={{ background: "var(--color-stone)" }} />
                <span className="blog-meta-text">{formatDate(post.date)}</span>
                <span className="blog-meta-sep" style={{ background: "var(--color-stone)" }} />
                <span className="blog-meta-text">{post.readTime} min read</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={2}>
              <h1>{post.title}</h1>
            </RevealOnScroll>

            <RevealOnScroll delay={3}>
              <p className="blog-article-hero__excerpt">{post.excerpt}</p>
            </RevealOnScroll>

            {post.tags.length > 0 && (
              <RevealOnScroll delay={4}>
                <div className="blog-article-hero__tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-article-hero__tag">{tag}</span>
                  ))}
                </div>
              </RevealOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          HERO IMAGE — parallax zoom on scroll
          ============================================================ */}
      <BlogArticleImage src={post.image} />

      {/* ============================================================
          ARTICLE BODY
          ============================================================ */}
      <article
        className="blog-article-body"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content, { async: false }) as string }}
      />

      {/* ============================================================
          RELATED POSTS
          ============================================================ */}
      {related.length > 0 && (
        <section className="blog-related">
          <div className="blog-related__inner">
            <RevealOnScroll>
              <div className="blog-related__header">
                <span className="eyebrow">Continue Reading</span>
                <h2>Related posts</h2>
              </div>
            </RevealOnScroll>

            <div className="blog-grid">
              {related.map((relPost, i) => (
                <RevealOnScroll
                  key={relPost.id}
                  delay={Math.min(i, 1) as 0 | 1}
                >
                  <Link href={`/gallery/blogs/${relPost.slug}`} className="blog-card">
                    <div className="blog-card__image">
                      <Image
                        src={relPost.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span className={`blog-cat-badge blog-cat-badge--${relPost.category}`}>
                          {relPost.category}
                        </span>
                        <span className="blog-meta-sep" />
                        <span className="blog-meta-text">{formatDateShort(relPost.date)}</span>
                        <span className="blog-meta-sep" />
                        <span className="blog-meta-text">{relPost.readTime} min</span>
                      </div>
                      <h3 className="blog-card__title">{relPost.title}</h3>
                      <p className="blog-card__excerpt">{relPost.excerpt}</p>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
