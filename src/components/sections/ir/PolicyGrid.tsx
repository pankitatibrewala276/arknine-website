"use client";

/**
 * PolicyGrid
 * ----------
 * Purpose: Searchable grid of policy documents. Each card opens a PDF in a new tab.
 * Used on: /investor-relations/policies
 * Visual: Search input + responsive 1/2/3-col card grid + empty state
 */
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ArkDocument } from "@/lib/strapi";
import { EmptyState } from "@/components/shared/EmptyState";

interface PolicyGridProps {
  documents: ArkDocument[];
}

/**
 * PdfDocumentMark — custom inline SVG illustration of a PDF document.
 * Built in Arknine brand colors: primary blue body + secondary orange PDF tab.
 * Uses currentColor / CSS vars where possible so it follows brand tokens.
 */
function PdfDocumentMark() {
  return (
    <svg
      viewBox="0 0 96 112"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PDF document"
      className="policy-card__svg"
    >
      {/* Soft drop shadow plate behind the document */}
      <rect
        x="10"
        y="14"
        width="72"
        height="92"
        rx="4"
        fill="rgba(51, 53, 94, 0.06)"
      />

      {/* Document body */}
      <path
        d="M14 8 H62 L82 28 V100 Q82 104, 78 104 H14 Q10 104, 10 100 V12 Q10 8, 14 8 Z"
        fill="#ffffff"
        stroke="#33355e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Folded corner */}
      <path
        d="M62 8 V24 Q62 28, 66 28 H82"
        fill="rgba(51, 53, 94, 0.08)"
        stroke="#33355e"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M62 8 L82 28"
        stroke="#33355e"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Content lines (mist) */}
      <rect x="20" y="44" width="44" height="2.5" rx="1.25" fill="#e8e9ed" />
      <rect x="20" y="52" width="56" height="2.5" rx="1.25" fill="#e8e9ed" />
      <rect x="20" y="60" width="50" height="2.5" rx="1.25" fill="#e8e9ed" />
      <rect x="20" y="68" width="38" height="2.5" rx="1.25" fill="#e8e9ed" />

      {/* PDF badge — secondary brand color */}
      <rect x="20" y="82" width="32" height="14" rx="2" fill="#df8b30" />
      <text
        x="36"
        y="92.5"
        fontFamily="'Avenir Next LT Pro', 'Avenir Next', Arial, sans-serif"
        fontSize="8"
        fontWeight="700"
        fill="#ffffff"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        PDF
      </text>
    </svg>
  );
}

export function PolicyGrid({ documents }: PolicyGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documents;
    return documents.filter((d) => d.title.toLowerCase().includes(q));
  }, [query, documents]);

  const total = documents.length;
  const shown = filtered.length;

  return (
    <div className="policy-grid">
      {/* Search bar — matches blog search capsule */}
      <div className="policy-grid__toolbar">
        <div className="policy-grid__search">
          <svg
            className="policy-grid__search-icon"
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policies..."
            aria-label="Search policies"
            className="policy-grid__search-input"
          />
        </div>
        <p className="policy-grid__count">
          {query ? `${shown} of ${total} policies` : `${total} policies`}
        </p>
      </div>

      {/* Grid / Empty state */}
      {shown === 0 ? (
        <EmptyState
          title={
            total === 0 ? "No policies published yet" : "No policies match your search"
          }
          description={
            total === 0
              ? "Policy documents will appear here once they are published. Please check back soon."
              : "Try a different keyword or browse all policies by clearing your search."
          }
          action={
            total > 0 && query ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ marginTop: "var(--space-4)" }}
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            ) : undefined
          }
        />
      ) : (
        <ul className="policy-grid__list" role="list">
          {filtered.map((doc) => (
            <li key={doc.id} className="policy-grid__item">
              <a
                href={doc.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="policy-card"
                aria-label={`Open ${doc.title} in a new tab`}
              >
                <span className="policy-card__arrow" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </span>

                <div className="policy-card__illustration" aria-hidden="true">
                  <PdfDocumentMark />
                </div>

                <h3 className="policy-card__title">{doc.title}</h3>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
