"use client";

import { useState, useEffect, useRef } from "react";

const phrases = [
  "Operating System",
  "Growth Engine",
  "Supply Chain",
  "Infrastructure",
];

// Longest phrase determines min-width to prevent CLS
const longestPhrase = phrases.reduce((a, b) => (a.length > b.length ? a : b));

export function TypingHeadline() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // Respect reduced motion — show static text instead
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(phrases[0]);
      return;
    }

    const phrase = phrases[currentPhrase];

    if (!isDeleting && displayText === phrase) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), 2400);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      return;
    }

    const speed = isDeleting ? 40 : 80;

    timeoutRef.current = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(phrase.slice(0, displayText.length - 1));
      } else {
        setDisplayText(phrase.slice(0, displayText.length + 1));
      }
    }, speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <h1
      className="hero-text__heading"
      aria-label={`The ${phrases[currentPhrase]} for Textile Trade`}
    >
      <span aria-hidden="true">
        The{" "}
        <span className="hero-text__typed-wrap">
          {/* Invisible sizer to prevent CLS */}
          <span className="hero-text__sizer">{longestPhrase}</span>
          <span className="hero-text__typed">{displayText}</span>
          <span className="hero-text__cursor" />
        </span>
        <br />
        for Textile Trade
      </span>
    </h1>
  );
}
