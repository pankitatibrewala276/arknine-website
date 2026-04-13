"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Location data — pin positions as % of the SVG viewBox (2500×2843) */
/* ------------------------------------------------------------------ */
interface Location {
  id: string;
  city: string;
  label?: string;
  address?: string;
  phone?: string;
  px: number;
  py: number;
}

const locations: Location[] = [
  {
    id: "mumbai-hq",
    city: "Mumbai",
    label: "Main Office",
    address:
      "2nd Floor, 599 Kapadia Chambers, JSS Road, Chira Bazar, Mumbai 400002",
    phone: "+91 7977048248",
    px: 16,
    py: 62,
  },
  {
    id: "mumbai-ec",
    city: "Mumbai",
    label: "Experience Centre",
    address:
      "Room No. 120-121, 1st Floor, Gold Mohur CHS Ltd, 174 Princess Street, Kalbadevi, Mumbai 400002",
    phone: "+91 7977048248",
    px: 18,
    py: 62,
  },
  {
    id: "surat",
    city: "Surat",
    px: 17,
    py: 55,
  },
  {
    id: "ahmedabad",
    city: "Ahmedabad",
    px: 17,
    py: 51,
  },
  {
    id: "bhiwandi",
    city: "Bhiwandi",
    px: 20,
    py: 60,
  },
  {
    id: "kolkata",
    city: "Kolkata",
    px: 68,
    py: 50,
  },
  {
    id: "ludhiana",
    city: "Ludhiana",
    px: 25,
    py: 24,
  },
  {
    id: "delhi",
    city: "New Delhi",
    px: 30,
    py: 30,
  },
  {
    id: "tiruppur",
    city: "Tiruppur",
    px: 37,
    py: 87,
  },
  {
    id: "bangalore",
    city: "Bangalore",
    px: 31.5,
    py: 80,
  },
  {
    id: "coimbatore",
    city: "Coimbatore",
    px: 30,
    py: 88,
  },
];

/* ------------------------------------------------------------------ */
/*  Tooltip position helper                                            */
/* ------------------------------------------------------------------ */
function getTooltipStyle(px: number, py: number) {
  let translateX = "0%";
  let translateY = "12px";

  if (px > 55) translateX = "-100%";
  if (py > 65) translateY = "calc(-100% - 20px)";

  return {
    left: `${px}%`,
    top: `${py}%`,
    transform: `translate(${translateX}, ${translateY})`,
  };
}

/* ------------------------------------------------------------------ */
/*  Collapsible location list                                          */
/* ------------------------------------------------------------------ */
const VISIBLE_COUNT = 4;

function LocationList({
  locations: locs,
  active,
  onEnter,
  onLeave,
  onClick,
}: {
  locations: Location[];
  active: Location | null;
  onEnter: (l: Location) => void;
  onLeave: () => void;
  onClick: (l: Location) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? locs : locs.slice(0, VISIBLE_COUNT);
  const hiddenCount = locs.length - VISIBLE_COUNT;

  return (
    <div className="india-map__list">
      {visible.map((loc) => (
        <button
          key={loc.id}
          type="button"
          className={`india-map__list-item ${active?.id === loc.id ? "india-map__list-item--active" : ""}`}
          onMouseEnter={() => onEnter(loc)}
          onMouseLeave={onLeave}
          onClick={() => onClick(loc)}
        >
          <div className="india-map__list-left">
            <span className="india-map__list-city">{loc.city}</span>
            {loc.label && (
              <span className="india-map__list-label">{loc.label}</span>
            )}
          </div>
          {loc.phone && (
            <span className="india-map__list-phone">{loc.phone}</span>
          )}
        </button>
      ))}

      {hiddenCount > 0 && (
        <button
          type="button"
          className="india-map__list-expand"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show less" : `View all ${locs.length} locations`}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={expanded ? "india-map__list-expand-icon--up" : ""}
          >
            <path d="M3 5l3 3 3-3" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export function IndiaMap() {
  const [active, setActive] = useState<Location | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handlePinEnter = useCallback(
    (loc: Location) => {
      if (!pinned) setActive(loc);
    },
    [pinned]
  );

  const handlePinLeave = useCallback(() => {
    if (!pinned) setActive(null);
  }, [pinned]);

  const handlePinClick = useCallback(
    (loc: Location) => {
      if (pinned === loc.id) {
        setPinned(null);
        setActive(null);
      } else {
        setPinned(loc.id);
        setActive(loc);
      }
    },
    [pinned]
  );

  // Close on outside click
  useEffect(() => {
    if (!pinned) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setPinned(null);
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [pinned]);

  return (
    <div className="india-map" ref={wrapRef}>
      {/* Map canvas — static SVG image + pin overlays */}
      <div className="india-map__canvas">
        <Image
          src="/india_state_outline.svg"
          alt="Map of India with state boundaries"
          width={2500}
          height={2843}
          className="india-map__svg"
          priority
        />

        {/* Pin overlays */}
        {locations.map((loc) => {
          const isActive = active?.id === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              className={`india-map__pin ${isActive ? "india-map__pin--active" : ""}`}
              style={{ left: `${loc.px}%`, top: `${loc.py}%` }}
              onMouseEnter={() => handlePinEnter(loc)}
              onMouseLeave={handlePinLeave}
              onClick={(e) => {
                e.stopPropagation();
                handlePinClick(loc);
              }}
              aria-label={`${loc.city} — ${loc.label}`}
            >
              <span className="india-map__pin-ring" />
              <span className="india-map__pin-dot" />
            </button>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              className="india-map__tooltip"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
              style={getTooltipStyle(active.px, active.py)}
            >
              <span className="india-map__tooltip-city">{active.city}</span>
              {active.label && (
                <span className="india-map__tooltip-label">{active.label}</span>
              )}
              {active.address && (
                <p className="india-map__tooltip-address">{active.address}</p>
              )}
              {active.phone && (
                <a
                  href={`tel:${active.phone.replace(/\s/g, "")}`}
                  className="india-map__tooltip-phone"
                  onClick={(e) => e.stopPropagation()}
                >
                  {active.phone}
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Location list — collapsed by default, expand to show all */}
      <LocationList
        locations={locations}
        active={active}
        onEnter={handlePinEnter}
        onLeave={handlePinLeave}
        onClick={handlePinClick}
      />
    </div>
  );
}
