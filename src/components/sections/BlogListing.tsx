"use client";

import { useState, useMemo, useCallback, useRef, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  getFeaturedPost,
  type BlogPost,
} from "@/data/blog";

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */
const TABS = [
  { label: "All", value: "all" },
  { label: "Press Releases", value: "PR" },
  { label: "Insights", value: "Blog" },
  { label: "Events", value: "Event" },
] as const;

const SORT_OPTIONS = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
] as const;

const POSTS_PER_PAGE = 9;

/* ------------------------------------------------------------------ */
/*  Motion                                                              */
/* ------------------------------------------------------------------ */
const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

/* ------------------------------------------------------------------ */
/*  Format                                                              */
/* ------------------------------------------------------------------ */
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Skeleton (memoized, isolated)                                       */
/* ------------------------------------------------------------------ */
const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="blog-skeleton">
      <div className="blog-skeleton__image" />
      <div className="blog-skeleton__body">
        <div className="blog-skeleton__line blog-skeleton__line--sm" />
        <div className="blog-skeleton__line blog-skeleton__line--lg" />
        <div className="blog-skeleton__line blog-skeleton__line--md" />
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*  Scroll-reveal wrapper using Framer useInView                        */
/* ------------------------------------------------------------------ */
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ ...spring, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Post Card                                                           */
/* ------------------------------------------------------------------ */
const PostCard = memo(function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <ScrollReveal delay={Math.min(index * 0.08, 0.32)}>
      <Link href={`/gallery/blogs/${post.slug}`} className="blog-card">
        <div className="blog-card__image">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        <div className="blog-card__body">
          <div className="blog-card__meta">
            <span className={`blog-cat-badge blog-cat-badge--${post.category}`}>{post.category}</span>
            <span className="blog-meta-sep" />
            <span className="blog-meta-text">{formatDate(post.date)}</span>
            <span className="blog-meta-sep" />
            <span className="blog-meta-text">{post.readTime} min</span>
          </div>
          <h4 className="blog-card__title">{post.title}</h4>
          <p className="blog-card__excerpt">{post.excerpt}</p>
        </div>
      </Link>
    </ScrollReveal>
  );
});

/* ------------------------------------------------------------------ */
/*  Featured Post                                                       */
/* ------------------------------------------------------------------ */
const FeaturedPost = memo(function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={spring}
    >
      <Link href={`/gallery/blogs/${post.slug}`} className="blog-featured">
        <div className="blog-featured__image">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            priority
          />
        </div>
        <div className="blog-featured__content">
          <div className="blog-featured__meta">
            <span className={`blog-cat-badge blog-cat-badge--${post.category}`}>{post.category}</span>
            <span className="blog-meta-sep" />
            <span className="blog-meta-text">{formatDate(post.date)}</span>
            <span className="blog-meta-sep" />
            <span className="blog-meta-text">{post.readTime} min read</span>
          </div>
          <h2 className="blog-featured__title">{post.title}</h2>
          <p className="blog-featured__excerpt">{post.excerpt}</p>
          <div className="blog-featured__tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag-pill">{tag}</span>
            ))}
          </div>
          <span className="blog-featured__cta">
            Read more
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
});

/* ------------------------------------------------------------------ */
/*  Empty State Illustration (inline SVG — editorial style)              */
/* ------------------------------------------------------------------ */
function EmptyIllustration() {
  return (
    <svg className="blog-empty__illustration" width="200" height="140" viewBox="0 0 200 140" fill="none" aria-hidden="true">
      {/* Stacked paper sheets */}
      <rect x="40" y="28" width="120" height="90" rx="8" fill="var(--color-off-white)" stroke="var(--color-mist)" strokeWidth="1.5" />
      <rect x="48" y="20" width="120" height="90" rx="8" fill="var(--color-pure-white)" stroke="var(--color-mist)" strokeWidth="1.5" />
      <rect x="56" y="12" width="120" height="90" rx="8" fill="var(--color-pure-white)" stroke="var(--color-mist)" strokeWidth="1.5" />
      {/* Lines on top sheet */}
      <rect x="72" y="32" width="48" height="4" rx="2" fill="var(--color-mist)" />
      <rect x="72" y="44" width="72" height="3" rx="1.5" fill="var(--color-off-white)" />
      <rect x="72" y="54" width="60" height="3" rx="1.5" fill="var(--color-off-white)" />
      <rect x="72" y="64" width="66" height="3" rx="1.5" fill="var(--color-off-white)" />
      {/* Magnifying glass */}
      <circle cx="148" cy="88" r="18" stroke="var(--color-cool-grey)" strokeWidth="2" fill="none" opacity="0.5" />
      <line x1="161" y1="101" x2="174" y2="114" stroke="var(--color-cool-grey)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Question mark */}
      <text x="143" y="95" fontSize="18" fontWeight="600" fill="var(--color-cool-grey)" opacity="0.4" textAnchor="middle" fontFamily="var(--font-body)">?</text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Listing                                                        */
/* ------------------------------------------------------------------ */
export function BlogListing({ posts: allPosts }: { posts: BlogPost[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* Debounced search */
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setVisibleCount(POSTS_PER_PAGE);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    setVisibleCount(POSTS_PER_PAGE);
  }, []);

  /* Filter + Sort */
  const filteredPosts = useMemo(() => {
    let posts = [...allPosts];
    if (activeTab !== "all") posts = posts.filter((p) => p.category === activeTab);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    posts.sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    return posts;
  }, [activeTab, debouncedSearch, sortBy]);

  const featured = getFeaturedPost(filteredPosts);
  const gridPosts = filteredPosts.filter((p) => p.id !== featured?.id);
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + POSTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 450);
  }, []);

  return (
    <>
      {/* ========== NAV ========== */}
      <div className="blog-nav">
        <div className="blog-nav__inner page-wrapper">
          {/* Tabs — segmented control inside a tinted shell */}
          <div className="blog-nav__seg">
            <div className="blog-nav__seg-track" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={activeTab === tab.value}
                  className={`blog-nav__seg-item ${activeTab === tab.value ? "blog-nav__seg-item--active" : ""}`}
                  onClick={() => handleTabChange(tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search capsule + Sort */}
          <div className="blog-nav__actions">
            <div className="blog-nav__search-capsule">
              <svg className="blog-nav__search-icon" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" />
                <path d="M10.5 10.5L14 14" />
              </svg>
              <input
                type="search"
                className="blog-nav__search-field"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search blog posts"
              />
            </div>

            <button
              className="blog-nav__sort"
              onClick={() => setSortBy((s) => s === "newest" ? "oldest" : "newest")}
              aria-label={`Sort by ${sortBy === "newest" ? "oldest" : "newest"} first`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 4h12M4 8h8M6 12h4" />
              </svg>
              <span className="blog-nav__sort-label">
                {sortBy === "newest" ? "Newest" : "Oldest"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="page-wrapper">
        {filteredPosts.length === 0 ? (
          <motion.div
            className="blog-empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <EmptyIllustration />
            <h3 className="blog-empty__title">No posts match your search</h3>
            <p className="blog-empty__text">
              Try a different keyword or browse all posts by clearing your search.
            </p>
            {(debouncedSearch || activeTab !== "all") && (
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginTop: "var(--space-4)" }}
                onClick={() => {
                  setSearchQuery("");
                  setDebouncedSearch("");
                  setActiveTab("all");
                }}
              >
                Clear filters
              </button>
            )}
          </motion.div>
        ) : (
          <>
            {/* Featured */}
            <AnimatePresence mode="wait">
              {featured && <FeaturedPost key={featured.id} post={featured} />}
            </AnimatePresence>

            {/* Grid — 3 columns desktop */}
            <div className="blog-grid">
              <AnimatePresence mode="popLayout">
                {visiblePosts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </AnimatePresence>

              {isLoadingMore &&
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={`skel-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <SkeletonCard />
                  </motion.div>
                ))}
            </div>

            {hasMore && (
              <div className="blog-load-more">
                <button
                  className="btn btn-ghost btn-md"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  style={{ minWidth: 180 }}
                >
                  {isLoadingMore ? "Loading..." : "View more posts"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
