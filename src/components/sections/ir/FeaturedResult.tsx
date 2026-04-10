/**
 * FeaturedResult
 * --------------
 * Hero card for the latest shareholder letter (or any results document).
 * Two-column on desktop: dark period panel on the left, content on the right.
 * Single column stacked on mobile.
 *
 * Used on: /investor-relations/results
 * Click target: entire card opens the underlying PDF in a new tab.
 */
import { ArrowUpRight } from "lucide-react";
import type { ArkDocument } from "@/lib/strapi";

interface FeaturedResultProps {
  doc: ArkDocument;
}

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatLongDate(iso: string | null): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

function formatPeriod(
  year: number | null,
  duration: "HY1" | "HY2" | null
): { fy: string; half: string } | null {
  if (!year) return null;
  const fy = `FY${String(year).slice(-2)}`;
  const half =
    duration === "HY1" ? "H1" : duration === "HY2" ? "H2" : "Annual";
  return { fy, half };
}

export function FeaturedResult({ doc }: FeaturedResultProps) {
  const period = formatPeriod(doc.year, doc.duration);
  const date = formatLongDate(doc.date);

  return (
    <a
      href={doc.documentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-result"
      aria-label={`Open ${doc.title} in a new tab`}
    >
      {/* Left — dark period panel */}
      <div className="featured-result__period">
        <span className="featured-result__period-eyebrow">Latest</span>

        {period ? (
          <div className="featured-result__period-stack">
            <span className="featured-result__period-fy">{period.fy}</span>
            <span className="featured-result__period-half">{period.half}</span>
          </div>
        ) : (
          <div className="featured-result__period-stack">
            <span className="featured-result__period-fy">Featured</span>
          </div>
        )}

        <span className="featured-result__period-tag">
          {doc.documentType ?? "Results"}
        </span>
      </div>

      {/* Right — content */}
      <div className="featured-result__content">
        <span className="eyebrow">Featured Document</span>
        <h2 className="featured-result__title">{doc.title}</h2>

        {date && (
          <p className="featured-result__date">Published {date}</p>
        )}

        <p className="featured-result__description">
          The most recent shareholder communication from Arknine Technologies.
          Open the full PDF for the complete narrative, financial highlights,
          and forward outlook.
        </p>

        <span className="featured-result__cta">
          Open document
          <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
