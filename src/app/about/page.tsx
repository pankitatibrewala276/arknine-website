import { Metadata } from "next";
import { fetchTeamMembers } from "@/lib/strapi";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { DarkHero } from "@/components/shared/DarkHero";
import { TeamPortraitGrid } from "@/components/sections/TeamPortraitGrid";

export const metadata: Metadata = {
  title: "About — Arknine Technologies",
  description:
    "Arknine Technologies is a publicly listed, technology-driven textile solutions company transforming how the global textile industry sources, finances, and operates.",
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default async function AboutPage() {
  const teamMembers = await fetchTeamMembers();
  const boardMembers = teamMembers.filter((m) => m.type === "board");
  const kmpMembers = teamMembers.filter((m) => m.type === "kmp");
  return (
    <>
      <DarkHero
        eyebrow="About Arknine"
        title="Building the infrastructure for global textile trade"
        description="Arknine Technologies Limited is a publicly listed, technology-driven textile solutions company transforming how the global textile industry sources, finances, and operates — across India, China, Vietnam, and Indonesia."
      />

      {/* ============================================================
          OVERVIEW — Company narrative
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <div className="about-overview">
            <RevealOnScroll>
              <div className="about-overview__left">
                <span className="eyebrow">Company Overview</span>
                <h2>Integration, efficiency, and scalability</h2>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <div className="about-overview__right">
                <p>
                  Arknine Technologies combines deep industry expertise with a
                  technology-driven approach to address the structural
                  inefficiencies plaguing the textile supply chain. The company
                  operates an expanding ecosystem — Dukaan Dost — that functions
                  as foundational infrastructure for textile commerce.
                </p>
                <p>
                  By integrating sourcing, financing, logistics, and
                  technology-driven workflows into one platform, Arknine creates
                  high switching costs, ecosystem lock-in, and scalable network
                  effects that are difficult to replicate.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          MISSION & VISION — Side-by-side
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <div className="about-mv">
              <RevealOnScroll>
                <div className="about-mv__block">
                  <span className="about-mv__label">Our Vision</span>
                  <p className="about-mv__text">
                    To become the world&rsquo;s most trusted and efficient
                    textile ecosystem, enabling global trade through integrated
                    solutions.
                  </p>
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={1}>
                <div className="about-mv__block">
                  <span className="about-mv__label">Our Mission</span>
                  <ul className="about-mv__list">
                    <li>
                      Drive efficiency in textile trade through technology and
                      structured systems
                    </li>
                    <li>
                      Enable sustainable and responsible practices across the
                      textile lifecycle
                    </li>
                    <li>
                      Empower manufacturers, brands, and exporters with
                      integrated sourcing and financing solutions
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          LEADERSHIP — Board of Directors
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Governance</span>
              <h2>Board of Directors</h2>
            </div>
          </RevealOnScroll>

          <TeamPortraitGrid members={boardMembers} />
        </div>
      </section>

      {/* ============================================================
          KMP — Key Managerial Personnel
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">Key Personnel</span>
                <h2>Key Managerial Personnel</h2>
              </div>
            </RevealOnScroll>

            <TeamPortraitGrid members={kmpMembers} variant="compact" />
          </div>
        </div>
      </section>

      {/* ============================================================
          CSR
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <div className="about-overview">
            <RevealOnScroll>
              <div className="about-overview__left">
                <span className="eyebrow">Responsibility</span>
                <h2>Corporate Social Responsibility</h2>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <div className="about-overview__right">
                <p>
                  Arknine Technologies is committed to creating meaningful
                  impact beyond business. The company has contributed
                  &#8377;10,00,000 to Green Helping Foundation Trust, Gujarat,
                  supporting a wide range of social welfare activities
                  including education, healthcare, and community development.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
