"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Use passive scroll listener with rAF gating for parallax
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const rate = 0.35;
          el.style.transform = `translate3d(0, ${scrollY * rate}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="hero-video__media"
      ref={videoRef}
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video__video"
        preload="metadata"
        poster="/images/hero-poster.jpg"
        suppressHydrationWarning
      >
        {/*
          PLACEHOLDER: Using a remote stock video.
          Replace with a local file for production:
          1. Place your .mp4 file at: public/video/hero.mp4
          2. Change the src below to "/video/hero.mp4"
        */}
        <source
          src="https://videos.pexels.com/video-files/5765152/5765152-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
