/**
 * DarkHero
 * --------
 * The single hero banner used by every inner page (everything except the
 * homepage). Pattern: charcoal background + animated HeroGradient + eyebrow
 * + h1 + optional subtitle. Always full-viewport (min-height: 100dvh) and
 * full-width (no page-wrapper max-width). Always left-aligned.
 *
 * To change the look of every page hero in one shot, edit this file or the
 * `.blog-hero` rules in globals.css.
 *
 * Server component. RevealOnScroll inside is the only client leaf.
 */
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { HeroGradient } from "@/components/sections/HeroGradient";

interface DarkHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function DarkHero({ eyebrow, title, description }: DarkHeroProps) {
  return (
    <section className="blog-hero blog-hero--full">
      <HeroGradient />
      <div className="page-wrapper page-wrapper--wide">
        <div className="blog-hero__inner">
          <RevealOnScroll>
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
          </RevealOnScroll>
          {description && (
            <RevealOnScroll delay={1}>
              <p className="blog-hero__sub">{description}</p>
            </RevealOnScroll>
          )}
        </div>
      </div>
    </section>
  );
}
