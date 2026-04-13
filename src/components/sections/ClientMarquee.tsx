"use client";

import { useEffect, useRef } from "react";

interface ClientLogo {
  name: string;
  src: string;
}

interface ClientMarqueeProps {
  rows: ClientLogo[][];
}

function MarqueeRow({
  logos,
  direction = "left",
  duration = 40,
}: {
  logos: ClientLogo[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const animation = track.animate(
      [
        { transform: direction === "left" ? "translateX(0)" : "translateX(-50%)" },
        { transform: direction === "left" ? "translateX(-50%)" : "translateX(0)" },
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    const onHover = () => {
      animation.playbackRate = 0.3;
    };
    const onLeave = () => {
      animation.playbackRate = 1;
    };

    track.addEventListener("mouseenter", onHover);
    track.addEventListener("mouseleave", onLeave);

    return () => {
      animation.cancel();
      track.removeEventListener("mouseenter", onHover);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, [direction, duration]);

  const doubled = [...logos, ...logos];

  return (
    <div className="marquee">
      <div className="marquee__track" ref={trackRef}>
        {doubled.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="marquee__item">
            <img
              src={logo.src}
              alt={logo.name}
              className="marquee__logo-img"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee({ rows }: ClientMarqueeProps) {
  const directions: Array<"left" | "right"> = ["left", "right", "left"];
  const durations = [22, 28, 25];

  return (
    <div className="client-marquee">
      {rows.map((row, i) => (
        <MarqueeRow
          key={i}
          logos={row}
          direction={directions[i] || "left"}
          duration={durations[i] || 40}
        />
      ))}
    </div>
  );
}
