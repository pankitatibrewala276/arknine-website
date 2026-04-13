"use client";

/**
 * DocumentTimeline
 * ----------------
 * Reusable searchable + year-filtered timeline of arkDocuments.
 * Renders the standard Arknine document card pattern: single-column list,
 * transparent default → white-fill on hover (matches blog-card), title on
 * top with date eyebrow + arrow below.
 *
 * Used on:
 *   - /investor-relations/announcements (standalone layout, full blog-nav strip)
 *   - /investor-relations/governance Shareholding Pattern tab (inline layout)
 *
 * Variants (`layout` prop):
 *   - "standalone" → top blog-nav strip (filter + search + count) and a
 *     page-wrapper below. Use this for full-page document listings.
 *   - "inline"     → compact toolbar that sits inside an existing layout
 *     (e.g. inside a tab pane). No blog-nav wrapper.
 *
 * Date filter is automatic — derives the year set from each document's date
 * field. The shared <TabBar /> renders the year segmented control and the
 * shared <EmptyState /> renders the no-results view.
 */
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ArkDocument } from "@/lib/strapi";
import { TabBar } from "@/components/shared/TabBar";
import { EmptyState } from "@/components/shared/EmptyState";

interface DocumentTimelineProps {
  documents: ArkDocument[];
  layout?: "standalone" | "inline";
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  yearFilterAriaLabel?: string;
  countNoun?: { singular: string; plural: string };
  emptyNoneTitle?: string;
  emptyNoneDescription?: string;
  emptyFilteredTitle?: string;
  emptyFilteredDescription?: string;
  /** When true, surface the document type as an eyebrow on each card. */
  showDocumentType?: boolean;
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface ParsedDate {
  label: string;
  year: number;
}

function parseDate(iso: string | null): ParsedDate | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const day = String(d.getDate()).padStart(2, "0");
  return {
    label: `${day} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`,
    year: d.getFullYear(),
  };
}

export function DocumentTimeline({
  documents,
  layout = "standalone",
  searchPlaceholder = "Search documents...",
  searchAriaLabel = "Search documents",
  yearFilterAriaLabel = "Filter by year",
  countNoun = { singular: "result", plural: "results" },
  emptyNoneTitle = "Nothing published yet",
  emptyNoneDescription = "Documents will appear here as they are published.",
  emptyFilteredTitle = "No documents match your filters",
  emptyFilteredDescription = "Try a different keyword, change the year, or clear your filters.",
  showDocumentType = false,
}: DocumentTimelineProps) {
  const [query, setQuery] = useState("");
  const [activeYear, setActiveYear] = useState<string>("all");

  /* Derived years, newest first */
  const years = useMemo(() => {
    const set = new Set<number>();
    documents.forEach((d) => {
      const parsed = parseDate(d.date);
      if (parsed) set.add(parsed.year);
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [documents]);

  const yearTabs = useMemo(
    () => [
      { label: "All years", value: "all" },
      ...years.map((y) => ({ label: String(y), value: String(y) })),
    ],
    [years]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      if (activeYear !== "all") {
        const parsed = parseDate(d.date);
        if (!parsed || String(parsed.year) !== activeYear) return false;
      }
      if (q && !d.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [documents, query, activeYear]);

  const total = documents.length;
  const shown = filtered.length;
  const hasFiltering = query.trim().length > 0 || activeYear !== "all";

  const countLabel = hasFiltering
    ? `${shown} of ${total}`
    : `${total} ${total === 1 ? countNoun.singular : countNoun.plural}`;

  const clearFilters = () => {
    setQuery("");
    setActiveYear("all");
  };

  /* ------------------ Toolbar (filter + search + count) ------------------ */
  const toolbar = (
    <>
      {years.length > 0 ? (
        <div className="blog-nav__seg">
          <TabBar
            tabs={yearTabs}
            activeTab={activeYear}
            onChange={setActiveYear}
            ariaLabel={yearFilterAriaLabel}
          />
        </div>
      ) : (
        <span />
      )}

      <div className="blog-nav__actions">
        <div className="blog-nav__search-capsule">
          <svg
            className="blog-nav__search-icon"
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
            className="blog-nav__search-field"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={searchAriaLabel}
          />
        </div>
        <span className="doc-timeline__count">{countLabel}</span>
      </div>
    </>
  );

  /* ------------------ Card list ------------------ */
  const list =
    shown === 0 ? (
      <EmptyState
        title={total === 0 ? emptyNoneTitle : emptyFilteredTitle}
        description={
          total === 0 ? emptyNoneDescription : emptyFilteredDescription
        }
        action={
          total > 0 && hasFiltering ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ marginTop: "var(--space-4)" }}
              onClick={clearFilters}
            >
              Clear filters
            </button>
          ) : undefined
        }
      />
    ) : (
      <ul className="doc-timeline__list" role="list">
        {filtered.map((doc) => {
          const parsed = parseDate(doc.date);
          return (
            <li key={doc.id} className="doc-timeline__item">
              <a
                href={doc.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-timeline__card"
                aria-label={`Open ${doc.title} in a new tab`}
              >
                {showDocumentType && doc.documentType && (
                  <span className="doc-timeline__card-type">
                    {doc.documentType}
                  </span>
                )}
                <h3 className="doc-timeline__card-title">{doc.title}</h3>
                <div className="doc-timeline__card-foot">
                  <span className="doc-timeline__card-date">
                    {parsed ? parsed.label : "Undated"}
                  </span>
                  <span className="doc-timeline__card-arrow" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={1.8} />
                  </span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    );

  /* ------------------ Layout shells ------------------ */
  if (layout === "inline") {
    return (
      <div className="doc-timeline doc-timeline--inline">
        <div className="doc-timeline__toolbar">{toolbar}</div>
        {list}
      </div>
    );
  }

  // standalone — full blog-nav strip + page-wrapper
  return (
    <>
      <div className="blog-nav">
        <div className="blog-nav__inner page-wrapper">{toolbar}</div>
      </div>
      <div className="page-wrapper">{list}</div>
    </>
  );
}
