"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

function AnimatedCounter({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(String(end));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, started]);

  useEffect(() => {
    if (!started) return;

    let frame: number;
    const duration = 1800;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(String(Math.round(eased * end)));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end]);

  return (
    <div ref={ref} className="hero-impact__stat">
      <div className="hero-impact__stat-row">
        <span className="hero-impact__stat-value">{display}</span>
        {suffix && <span className="hero-impact__stat-suffix">{suffix}</span>}
      </div>
      <span className="hero-impact__stat-label">{label}</span>
    </div>
  );
}

export function HeroImpact() {
  return (
    <section className="hero-impact">
      <div className="page-wrapper">
        <div className="hero-impact__grid">
          {/* Left — Statement */}
          <div className="hero-impact__left">
            <RevealOnScroll>
              <p className="hero-impact__eyebrow">
                BSE Listed &middot; Textile Platform
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <h1 className="hero-impact__heading">
                One integrated platform for how textiles are{" "}
                <em>sourced</em>, <em>financed</em>,{" "}
                and <em>delivered</em>.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={2}>
              <p className="hero-impact__sub">
                Arknine Technologies connects every layer of the textile value
                chain — from raw material sourcing across four countries to
                last-mile delivery — through a single, technology-driven
                ecosystem.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={3}>
              <div className="hero-impact__actions">
                <Link href="/about" className="btn btn-primary btn-lg">
                  About Us
                </Link>
                <Link
                  href="/investor-relations"
                  className="btn btn-outline btn-lg"
                >
                  Investor Relations
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — Stats */}
          <div className="hero-impact__right">
            <RevealOnScroll delay={2}>
              <div className="hero-impact__stats">
                <AnimatedCounter end={4} label="Countries" />
                <div className="hero-impact__stat-divider" aria-hidden="true" />
                <AnimatedCounter end={3} label="Brands" />
                <div className="hero-impact__stat-divider" aria-hidden="true" />
                <AnimatedCounter end={5} suffix="+" label="Service Verticals" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
