"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  interactive?: boolean;
}

export function GradientBackground({
  children,
  className,
  containerClassName,
  interactive = true,
}: GradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const cur = useRef({ x: 0, y: 0 });
  const tg = useRef({ x: 0, y: 0 });
  const bounds = useRef({ x: 0, y: 0, w: 1, h: 1 });

  const tick = useCallback(() => {
    /* Smooth lerp — 0.06 factor = fluid, 0.12 = snappy */
    cur.current.x += (tg.current.x - cur.current.x) * 0.08;
    cur.current.y += (tg.current.y - cur.current.y) * 0.08;

    if (pointerRef.current) {
      pointerRef.current.style.transform = `translate3d(${cur.current.x}px, ${cur.current.y}px, 0)`;
    }

    if (orbsRef.current && bounds.current.w > 1) {
      const nx = (cur.current.x / bounds.current.w) * 2 - 1;
      const ny = (cur.current.y / bounds.current.h) * 2 - 1;
      orbsRef.current.style.transform = `translate3d(${nx * 24}px, ${ny * 18}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    rafRef.current = requestAnimationFrame(tick);

    const onMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      bounds.current = { x: r.left, y: r.top, w: r.width, h: r.height };
      // Position relative to container center
      tg.current.x = e.clientX - r.left - r.width * 0.25;
      tg.current.y = e.clientY - r.top - r.height * 0.25;
    };

    // Listen on window so mouse events aren't blocked by content z-index
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [tick, interactive]);

  return (
    <div ref={containerRef} className={cn("gradient-bg", containerClassName)}>
      <div className={cn("gradient-bg__content", className)}>
        {children}
      </div>
      <div className="gradient-bg__orbs" ref={orbsRef}>
        <div className="gradient-bg__orb gradient-bg__orb--1" />
        <div className="gradient-bg__orb gradient-bg__orb--2" />
        <div className="gradient-bg__orb gradient-bg__orb--3" />
        <div className="gradient-bg__orb gradient-bg__orb--4" />
        <div className="gradient-bg__orb gradient-bg__orb--5" />
        {interactive && (
          <div ref={pointerRef} className="gradient-bg__orb gradient-bg__orb--pointer" />
        )}
      </div>
    </div>
  );
}
