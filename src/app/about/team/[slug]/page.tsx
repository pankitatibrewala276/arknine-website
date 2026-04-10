import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchTeamMemberBySlug, fetchAllSlugs } from "@/lib/strapi";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await fetchTeamMemberBySlug(slug);
  if (!member) return { title: "Not Found" };
  return {
    title: `${member.name} — ${member.role} | Arknine Technologies`,
    description: member.bio,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await fetchTeamMemberBySlug(slug);
  if (!member) notFound();

  const typeLabel = member.type === "board" ? "Board of Directors" : "Key Managerial Personnel";

  return (
    <>
      {/* Hero */}
      <section className="profile-hero">
        <div className="page-wrapper">
          <RevealOnScroll>
            <Link href="/about" className="profile-hero__back">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 3L5 8l5 5" />
              </svg>
              Back to About
            </Link>
          </RevealOnScroll>

          <div className="profile-hero__grid">
            <RevealOnScroll>
              <div className="profile-hero__portrait">
                {member.imageSrc ? (
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    sizes="200px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="profile-hero__initials" aria-hidden="true">
                    {member.initials}
                  </div>
                )}
              </div>
            </RevealOnScroll>

            <div className="profile-hero__content">
              <RevealOnScroll delay={1}>
                <span className="eyebrow">{typeLabel}</span>
                <h1 className="profile-hero__name">{member.name}</h1>
                <span className="profile-hero__role">{member.role}</span>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="profile-hero__linkedin"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      {member.bio && (
        <section className="page-wrapper">
          <div className="section">
            <div className="profile-bio">
              <RevealOnScroll>
                <div className="profile-bio__left">
                  <span className="eyebrow">Background</span>
                  <h2>Profile</h2>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={1}>
                <div className="profile-bio__right">
                  <p>{member.bio}</p>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
