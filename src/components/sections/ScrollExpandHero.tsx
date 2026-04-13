"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

export function ScrollExpandHero() {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/video/Hero Video.mp4"
      posterSrc="/images/Hero Image.png"
      bgImageSrc="/images/Hero Image.png"
      titleLines={[
        "THE OPERATING SYSTEM",
        "FOR TEXTILE TRADE",
      ]}
      scrollToExpand="Scroll to explore"
      textBlend
    />
  );
}
