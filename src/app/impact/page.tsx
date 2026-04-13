import { Metadata } from "next";
import Image from "next/image";
import { DarkHero } from "@/components/shared/DarkHero";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export const metadata: Metadata = {
  title: "Impact — Arknine Technologies",
  description:
    "How Arknine Technologies creates impact beyond business — corporate social responsibility, contributions, and community initiatives across India.",
};

const stats = [
  { value: "10L", suffix: "₹", label: "Contributed in FY 2025–26" },
  { value: "01", suffix: "", label: "Beneficiary partner" },
  { value: "03", suffix: "", label: "Focus areas" },
];

const focusAreas = [
  {
    title: "Education",
    description:
      "Supporting access to quality schooling, learning materials, and scholarships for underprivileged children across rural Gujarat.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80&auto=format&fit=crop",
    alt: "Open books on a wooden desk representing access to education",
  },
  {
    title: "Healthcare",
    description:
      "Funding community health camps, preventive screenings, and basic medical infrastructure where public services are stretched.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop",
    alt: "Stethoscope on a clinical surface representing community healthcare",
  },
  {
    title: "Community Development",
    description:
      "Backing long-running grassroots initiatives in livelihood, water access, and women-led local enterprise.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80&auto=format&fit=crop",
    alt: "A group of hands joined together representing community development",
  },
];

export default function ImpactPage() {
  return (
    <>
      <DarkHero
        eyebrow="Impact"
        title="Impact beyond business"
        description="A publicly listed company carries a responsibility that extends beyond its shareholders. Our approach to social impact mirrors how we run our businesses — measured, transparent, and focused on outcomes that endure."
      />

      {/* ============================================================
          STATS BANNER — 3 metrics in a row
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="impact-stats">
                {stats.map((s) => (
                  <div key={s.label} className="impact-stat">
                    <span className="impact-stat__value">
                      {s.suffix && (
                        <span className="impact-stat__suffix">{s.suffix}</span>
                      )}
                      {s.value}
                    </span>
                    <span className="impact-stat__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED INITIATIVE — image + story split
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section" style={{ borderTop: "none" }}>
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Featured Initiative</span>
              <h2>Green Helping Foundation Trust</h2>
              <p>
                Our active CSR commitment for the current financial year, in
                partnership with a Gujarat-based community trust with a deep
                operational track record.
              </p>
            </div>
          </RevealOnScroll>

          <div className="impact-featured">
            <RevealOnScroll>
              <figure className="impact-featured__media">
                <Image
                  src="https://picsum.photos/seed/arknine-impact-gujarat/1100/1380"
                  alt="Community impact initiative in Gujarat"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="impact-featured__img"
                />
                <span className="impact-featured__badge">FY 2025–26</span>
              </figure>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <div className="impact-featured__body">
                {/* Group 1 — contribution heading (tight) */}
                <div className="impact-featured__head">
                  <span className="eyebrow">Contribution</span>
                  <p className="impact-featured__amount">
                    <span className="impact-featured__currency">&#8377;</span>
                    10,00,000
                  </p>
                  <p className="impact-featured__location">
                    Green Helping Foundation Trust &middot; Gujarat, India
                  </p>
                </div>

                <div className="impact-featured__divider" aria-hidden="true" />

                {/* Group 2 — story (paragraphs) */}
                <div className="impact-featured__story">
                  <p>
                    As part of its CSR initiatives, Arknine Technologies has
                    contributed&nbsp;&#8377;10,00,000 to Green Helping Foundation
                    Trust — supporting a wide range of social welfare activities
                    across Gujarat. The Trust runs grassroots programs spanning
                    education for underprivileged children, healthcare outreach,
                    and long-term community development.
                  </p>
                  <p>
                    We chose Green Helping Foundation because of their measurable
                    on-ground impact and alignment with the values of integrity
                    and long-term thinking that guide every part of Arknine.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOCUS AREAS — 3 visual cards
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">Focus Areas</span>
                <h2>Where contributions are directed</h2>
                <p>
                  Our partner deploys funds across three areas that compound in
                  long-term community welfare.
                </p>
              </div>
            </RevealOnScroll>

            <div className="impact-focus">
              {focusAreas.map((area, i) => (
                <RevealOnScroll
                  key={area.title}
                  delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}
                >
                  {/* Reuses .blog-card classes directly so focus cards are
                      byte-identical to the blog post cards. */}
                  <article className="blog-card">
                    <div className="blog-card__image">
                      <Image
                        src={area.image}
                        alt={area.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
                      />
                    </div>
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span className="blog-meta-text">Focus area</span>
                      </div>
                      <h4 className="blog-card__title">{area.title}</h4>
                      <p className="blog-card__excerpt">{area.description}</p>
                    </div>
                  </article>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
