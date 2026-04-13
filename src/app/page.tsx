import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { ScrollExpandHero } from "@/components/sections/ScrollExpandHero";
import { HeroImpact } from "@/components/sections/HeroImpact";
import { BrandsAccordion } from "@/components/sections/BrandsAccordion";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote:
      "Working with Arknine transformed how we approach textile procurement. The speed and reliability of their supply chain is unmatched in the industry.",
    name: "Rajesh Mehta",
    role: "Head of Procurement",
    company: "Leading Retail Group",
    initials: "RM",
  },
  {
    quote:
      "Their financing solutions gave us the flexibility to scale production without the usual cash-flow constraints. A genuine partner, not just a vendor.",
    name: "Priya Venkatesh",
    role: "Managing Director",
    company: "Textile Manufacturing Co.",
    initials: "PV",
  },
  {
    quote:
      "The experience centre changed our buying process entirely. Evaluating fabrics hands-on before committing large orders reduced our return rate significantly.",
    name: "Ankit Sharma",
    role: "Head of Sourcing",
    company: "Fashion & Lifestyle Brand",
    initials: "AS",
  },
];

const clientLogosRow1 = [
  { name: "Client 1", src: "/images/clients/client-1.png" },
  { name: "Client 2", src: "/images/clients/client-2.png" },
  { name: "Client 3", src: "/images/clients/client-3.png" },
  { name: "Client 4", src: "/images/clients/client-4.png" },
  { name: "Client 5", src: "/images/clients/client-5.png" },
  { name: "Client 6", src: "/images/clients/client-6.png" },
];

const clientLogosRow2 = [
  { name: "Client 7", src: "/images/clients/client-7.png" },
  { name: "Client 8", src: "/images/clients/client-8.png" },
  { name: "Client 9", src: "/images/clients/client-9.png" },
  { name: "Client 10", src: "/images/clients/client-10.png" },
  { name: "Client 11", src: "/images/clients/client-11.png" },
  { name: "Client 12", src: "/images/clients/client-12.png" },
];

const clientLogosRow3 = [
  { name: "Client 13", src: "/images/clients/client-13.png" },
  { name: "Client 14", src: "/images/clients/client-14.png" },
  { name: "Client 15", src: "/images/clients/client-15.png" },
  { name: "Client 16", src: "/images/clients/client-16.png" },
  { name: "Client 17", src: "/images/clients/client-17.png" },
  { name: "Client 18", src: "/images/clients/client-18.png" },
];

const whyArknine = [
  {
    title: "High Switching Costs",
    description: "Deep integration across sourcing, financing, and operations makes Arknine indispensable to client workflows.",
  },
  {
    title: "Ecosystem Lock-in",
    description: "Customers benefit from a unified platform that compounds value the longer they operate within the ecosystem.",
  },
  {
    title: "Network Effects",
    description: "Each new participant strengthens the platform for everyone — suppliers, buyers, and logistics partners alike.",
  },
  {
    title: "Barrier to Entry",
    description: "Multi-layer integration across geographies creates structural advantages that are difficult to replicate.",
  },
];

const problemPoints = [
  "Fragmented supplier networks",
  "Inconsistent quality standards",
  "Restricted working capital access",
  "Supply chain opacity and delays",
];

const solutionPoints = [
  "Global sourcing networks",
  "Supply chain financing solutions",
  "Product development and innovation",
  "Technology-driven workflows via Dukaan Dost",
];

const serviceIcons: Record<string, React.ReactNode> = {
  Globe: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Banknote: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  ),
  FlaskConical: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16.5h10" />
    </svg>
  ),
  Truck: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  ),
  Building: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO — Scroll-to-expand video
          ============================================================ */}
      <ScrollExpandHero />

      {/* ============================================================
          IMPACT STATEMENT — The payoff for scrolling
          ============================================================ */}
      <HeroImpact />

      {/* ============================================================
          PROBLEM / SOLUTION — Side-by-side columns
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Why We Exist</span>
              <h2>Solving Textile&rsquo;s Core Inefficiencies</h2>
            </div>
          </RevealOnScroll>

          <div className="problem-solution">
            <RevealOnScroll>
              <div className="problem-solution__col">
                <h3 className="problem-solution__label problem-solution__label--problem">
                  The Problem
                </h3>
                <ul className="problem-solution__list">
                  {problemPoints.map((point) => (
                    <li key={point} className="problem-solution__item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="var(--color-failure)" strokeWidth="1.5" />
                        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="var(--color-failure)" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <div className="problem-solution__divider" aria-hidden="true" />

            <RevealOnScroll delay={1}>
              <div className="problem-solution__col">
                <h3 className="problem-solution__label problem-solution__label--solution">
                  Our Solution
                </h3>
                <ul className="problem-solution__list">
                  {solutionPoints.map((point) => (
                    <li key={point} className="problem-solution__item">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7" stroke="var(--color-success)" strokeWidth="1.5" />
                        <path d="M5 8l2 2 4-4" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY ARKNINE
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">Platform Advantage</span>
                <h2>Why Arknine</h2>
                <p>
                  Unlike traditional textile companies operating in silos, Arknine
                  functions as a platform integrating multiple value chain layers.
                </p>
              </div>
            </RevealOnScroll>

            <div className="advantage-grid">
              {whyArknine.map((item, i) => (
                <RevealOnScroll key={item.title} delay={Math.min(i, 3) as 0 | 1 | 2 | 3}>
                  <div className="advantage-card">
                    <span className="advantage-card__number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="advantage-card__title">{item.title}</h3>
                    <p className="advantage-card__desc">{item.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BUSINESSES — Brand Accordion
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Our Businesses</span>
              <h2>Three Brands, One Vision</h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={1}>
            <BrandsAccordion />
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
          SERVICES — What We Do
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">What We Do</span>
                <h2>End-to-End Textile Infrastructure</h2>
                <p>
                  From sourcing raw materials to delivering finished products — we
                  provide every layer of the textile value chain.
                </p>
              </div>
            </RevealOnScroll>

            <div className="services-grid">
              {services.map((service, i) => (
                <RevealOnScroll
                  key={service.title}
                  delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}
                >
                  <div className="service-card">
                    <div className="service-card__icon">
                      {serviceIcons[service.iconName]}
                    </div>
                    <h3 className="service-card__title">{service.title}</h3>
                    <p className="service-card__desc">{service.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CLIENTS — Scrolling Marquee
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Trusted By</span>
              <h2>Industry Leaders We Work With</h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={1}>
            <ClientMarquee rows={[clientLogosRow1, clientLogosRow2]} />
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">Testimonials</span>
                <h2>What Our Partners Say</h2>
              </div>
            </RevealOnScroll>

            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <RevealOnScroll key={t.name} delay={i as 0 | 1 | 2}>
                  <figure className="testimonial-card">
                    <div className="testimonial-card__body">
                      <svg
                        className="testimonial-card__quote-icon"
                        width="28"
                        height="20"
                        viewBox="0 0 28 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M0 20V11.25C0 7.91667 0.854167 5.20833 2.5625 3.125C4.27083 1.04167 6.70833 0 9.875 0V4.375C8.29167 4.375 7.04167 4.89583 6.125 5.9375C5.20833 6.97917 4.75 8.33333 4.75 10H9.5V20H0ZM18.5 20V11.25C18.5 7.91667 19.3542 5.20833 21.0625 3.125C22.7708 1.04167 25.2083 0 28.375 0V4.375C26.7917 4.375 25.5417 4.89583 24.625 5.9375C23.7083 6.97917 23.25 8.33333 23.25 10H28V20H18.5Z" />
                      </svg>
                      <blockquote className="testimonial-card__text">
                        <p>{t.quote}</p>
                      </blockquote>
                    </div>
                    <figcaption className="testimonial-card__author">
                      <div className="testimonial-card__avatar" aria-hidden="true">
                        {t.initials}
                      </div>
                      <div>
                        <cite className="testimonial-card__name">{t.name}</cite>
                        <div className="testimonial-card__role">
                          {t.role}, {t.company}
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER — Standalone Section
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <NewsletterSection />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
