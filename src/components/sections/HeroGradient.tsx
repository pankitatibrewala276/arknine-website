"use client";

import { GradientBackground } from "@/components/ui/GradientBackground";

/**
 * Reusable animated gradient overlay for dark hero sections.
 * Place as first child inside a hero <section> — it positions itself absolutely.
 */
export function HeroGradient() {
  return (
    <GradientBackground
      containerClassName="hero-gradient-fill"
      interactive
    />
  );
}
