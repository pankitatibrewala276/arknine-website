import { Metadata } from "next";
import { DarkHero } from "@/components/shared/DarkHero";
import { BlogListing } from "@/components/sections/BlogListing";
import { fetchPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blog & PR — Arknine Technologies",
  description:
    "News, press releases, events, and insights from Arknine Technologies — the operating system for textile trade.",
};

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <>
      <DarkHero
        eyebrow="Blog & Press Room"
        title="News, insights, and updates"
        description="Press releases, industry analysis, event coverage, and perspectives on the future of global textile trade."
      />

      {/* ============================================================
          LISTING — Client interactive component
          ============================================================ */}
      <BlogListing posts={posts} />
    </>
  );
}
