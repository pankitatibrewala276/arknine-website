import { Metadata } from "next";
import { fetchArkDocuments, type ArkDocument, type ArkDocumentType } from "@/lib/strapi";
import { DarkHero } from "@/components/shared/DarkHero";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { FeaturedResult } from "@/components/sections/ir/FeaturedResult";
import { ResultsPeriodList } from "@/components/sections/ir/ResultsPeriodList";

export const metadata: Metadata = {
  title: "Results — Investor Relations",
  description:
    "Half-yearly shareholder letters, earnings calls, KPI data books, and annual reports from Arknine Technologies Limited.",
};

const RESULT_TYPES: ArkDocumentType[] = [
  "Shareholder's Letters and Results",
  "Earnings Call Replay",
  "Earnings Call Transcript",
  "KPI Data Book",
  "Annual Report",
  "Archive",
];

/** Sort by `date` desc, treating null as oldest. */
function sortByDateDesc(a: ArkDocument, b: ArkDocument) {
  const ta = a.date ? new Date(a.date).getTime() : 0;
  const tb = b.date ? new Date(b.date).getTime() : 0;
  return tb - ta;
}

export default async function ResultsPage() {
  const all = await fetchArkDocuments(RESULT_TYPES, "publishDate:desc");

  // Latest shareholder letter for the featured slot. Fall back to the most
  // recent document of any result type so the featured slot is never silently
  // hidden when no shareholder letter has been uploaded yet.
  const sorted = [...all].sort(sortByDateDesc);
  const featured =
    sorted.find(
      (d) => d.documentType === "Shareholder's Letters and Results"
    ) ?? sorted[0] ?? null;

  return (
    <>
      <DarkHero
        eyebrow="Investor Relations"
        title="Results"
        description="Half-yearly shareholder letters, earnings calls, KPI data books, and annual reports — every document Arknine Technologies has filed for its public market stakeholders."
      />

      {/* ============================================================
          FEATURED LETTER
          ============================================================ */}
      {featured && (
        <section className="page-wrapper">
          <div className="section" style={{ borderTop: "none", paddingTop: "var(--space-12)" }}>
            <RevealOnScroll>
                <FeaturedResult doc={featured} />
            </RevealOnScroll>
          </div>
        </section>
      )}

      {/* ============================================================
          ALL RESULTS — grouped by financial period
          ============================================================ */}
      <section className="section-bg-alt results-section">
        <div className="page-wrapper">
          <div
            className="section"
            style={{
              borderTop: "none",
              paddingTop: "var(--space-12)",
              paddingBottom: "var(--space-8)",
            }}
          >
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">Reporting History</span>
                <h2>Results by period</h2>
                <p>
                  Every half-yearly and annual filing, grouped by reporting
                  period. Each period lists the full set of materials we
                  publish — letter, earnings call, transcript, and KPI book.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Tab strip is rendered full-bleed inside the section so the
            border-bottom hairline matches the Blog & PR / Announcements
            pages exactly. The year-section content lives in its own
            page-wrapper below. */}
        <RevealOnScroll delay={1}>
          <ResultsPeriodList documents={all} />
        </RevealOnScroll>
      </section>
    </>
  );
}
