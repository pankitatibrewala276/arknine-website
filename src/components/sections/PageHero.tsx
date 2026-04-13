/**
 * PageHero
 * --------
 * Purpose: Hero banner for inner pages (About, Contact, Gallery, IR pages).
 * Used on: Every page except Home (Home has its own bespoke hero).
 * Visual: section with eyebrow + h1 + optional description. No image.
 * Generic: yes — reused on all inner pages with different content.
 */
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <div className="hero section">
      {eyebrow && (
        <RevealOnScroll>
          <div className="hero-eyebrow">
            <span className="dot" />
            {eyebrow}
          </div>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={1}>
        <h1>{title}</h1>
      </RevealOnScroll>
      {description && (
        <RevealOnScroll delay={2}>
          <p className="hero-description">{description}</p>
        </RevealOnScroll>
      )}
    </div>
  );
}
