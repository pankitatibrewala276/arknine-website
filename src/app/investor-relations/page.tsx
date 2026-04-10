import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  fetchArkDocuments,
  type ArkDocument,
  type ArkDocumentType,
} from "@/lib/strapi";
import { DarkHero } from "@/components/shared/DarkHero";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Investor Relations — Arknine Technologies",
  description:
    "Disclosure library for Arknine Technologies Limited. Half-yearly results, board governance, corporate policies, and stock exchange announcements — all in one place.",
};

const RESULT_TYPES: ArkDocumentType[] = [
  "Shareholder's Letters and Results",
  "Earnings Call Replay",
  "Earnings Call Transcript",
  "KPI Data Book",
  "Annual Report",
];

const TYPE_LABELS: Partial<Record<ArkDocumentType, string>> = {
  "Shareholder's Letters and Results": "Shareholder Letter",
  "Annual Report": "Annual Report",
  "Earnings Call Replay": "Call Replay",
  "Earnings Call Transcript": "Transcript",
  "KPI Data Book": "KPI Data Book",
};

const COMMITTEES = ["Board", "Audit", "NRC", "Stakeholder", "CSR"];

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatShortDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function sortByDateDesc(a: ArkDocument, b: ArkDocument) {
  const ta = a.date ? new Date(a.date).getTime() : 0;
  const tb = b.date ? new Date(b.date).getTime() : 0;
  return tb - ta;
}

export default async function InvestorRelationsPage() {
  // One round-trip — fetch every active disclosure document, then bucket by
  // type so each section card can show live data.
  const all = await fetchArkDocuments(undefined, "publishDate:desc");

  const byType = new Map<string, ArkDocument[]>();
  for (const d of all) {
    const k = d.documentType ?? "Other";
    if (!byType.has(k)) byType.set(k, []);
    byType.get(k)!.push(d);
  }

  // Current FY = the newest `year` present on any results-typed doc.
  // Everything with that year renders in the "current year" list below,
  // and the full archive sits behind the "See all results" CTA.
  const resultsDocs = all.filter(
    (d) => d.documentType && RESULT_TYPES.includes(d.documentType)
  );
  const currentFY = resultsDocs.reduce<number | null>(
    (max, d) => (d.year && (max === null || d.year > max) ? d.year : max),
    null
  );
  const currentDocs = currentFY
    ? [...resultsDocs]
        .filter((d) => d.year === currentFY)
        .sort(sortByDateDesc)
    : [];

  // Bento previews — the 3 most recent items for each section
  const latestPolicies = (byType.get("Policy") ?? [])
    .slice()
    .sort(sortByDateDesc)
    .slice(0, 3);
  const latestAnnouncements = (byType.get("Announcement") ?? [])
    .slice()
    .sort(sortByDateDesc)
    .slice(0, 3);

  const sorted = [...all].sort(sortByDateDesc);
  const latestFilingDate = formatShortDate(sorted[0]?.date) ?? "—";

  return (
    <>
      <DarkHero
        eyebrow="Investor Relations"
        title="For our shareholders"
        description="Arknine Technologies Limited maintains a single, consolidated disclosure library for the public market. Every shareholder letter, earnings call, governance update, and regulatory filing is published here without delay."
      />

      {/* ============================================================
          SNAPSHOT — Company facts strip, first section after hero
          ============================================================ */}
      <section className="page-wrapper">
        <div
          className="section"
          style={{ borderTop: "none", paddingTop: "var(--space-12)" }}
        >
          <RevealOnScroll>
            <div className="section-header">
              <span className="eyebrow">Snapshot</span>
              <h2>Company at a glance</h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={1}>
            <div className="ir-snapshot">
              <div className="ir-snapshot__cell">
                <span className="ir-snapshot__label">Listed on</span>
                <span className="ir-snapshot__value">{company.listedOn}</span>
              </div>
              <div className="ir-snapshot__cell">
                <span className="ir-snapshot__label">CIN</span>
                <span className="ir-snapshot__value ir-snapshot__value--code">
                  {company.cin}
                </span>
              </div>
              <div className="ir-snapshot__cell">
                <span className="ir-snapshot__label">Registrar</span>
                <span className="ir-snapshot__value ir-snapshot__value--sm">
                  {company.rta.name}
                </span>
              </div>
              <div className="ir-snapshot__cell">
                <span className="ir-snapshot__label">Latest filing</span>
                <span className="ir-snapshot__value">{latestFilingDate}</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
          INVESTOR CONTACT — Asymmetric copy + details column
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <div className="ir-contact">
              <RevealOnScroll>
                <div>
                  <span className="eyebrow">Investor Contact</span>
                  <h2 className="ir-contact__heading">
                    Talk to investor relations
                  </h2>
                  <p className="ir-contact__lede">
                    For institutional inquiries, transcript requests, or
                    clarifications on any disclosure, our compliance desk
                    responds within one business day.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={1}>
                <div className="ir-contact__details">
                  <div className="ir-contact__row">
                    <span className="ir-contact__label">Investor email</span>
                    <span className="ir-contact__value">
                      <a href={`mailto:${company.contacts.investorEmail}`}>
                        {company.contacts.investorEmail}
                      </a>
                    </span>
                  </div>
                  <div className="ir-contact__row">
                    <span className="ir-contact__label">Registered office</span>
                    <span className="ir-contact__value">
                      {company.registeredOffice.name},{" "}
                      {company.registeredOffice.address}
                    </span>
                  </div>
                  <div className="ir-contact__row">
                    <span className="ir-contact__label">
                      Registrar &amp; transfer agent
                    </span>
                    <span className="ir-contact__value">
                      {company.rta.name}
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CURRENT YEAR DISCLOSURES — Wix-style flat list + "see all"
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section">
          <RevealOnScroll>
            <div className="ir-current">
              <div className="ir-current__head">
                <span className="eyebrow">
                  {currentFY
                    ? `FY${String(currentFY).slice(-2)}`
                    : "Latest"}
                </span>
                <h2 className="ir-current__title">Current year disclosures</h2>
                <p className="ir-current__sub">
                  Shareholder letters, earnings calls, transcripts, and KPI
                  books filed this financial year. For the full reporting
                  history, open the results archive.
                </p>
                <div className="ir-current__footer">
                  <Link
                    href="/investor-relations/results"
                    className="ir-current__cta-all"
                  >
                    See all results
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>

              <div className="ir-current__list">
                {currentDocs.length === 0 ? (
                  <p className="ir-current__empty">
                    No documents have been filed for the current financial
                    year yet. New disclosures appear here as each reporting
                    period closes.
                  </p>
                ) : (
                  currentDocs.map((d) => (
                    <a
                      key={d.id}
                      href={d.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ir-current__item"
                      aria-label={`Open ${d.title} in a new tab`}
                    >
                      <span className="ir-current__type">
                        {d.documentType
                          ? (TYPE_LABELS[d.documentType] ?? d.documentType)
                          : "Document"}
                      </span>
                      <h3 className="ir-current__item-title">{d.title}</h3>
                      <time className="ir-current__date">
                        {formatShortDate(d.date) ?? "—"}
                      </time>
                      <span className="ir-current__arrow" aria-hidden="true">
                        <ArrowUpRight size={18} strokeWidth={1.8} />
                      </span>
                    </a>
                  ))
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ============================================================
          BENTO — Governance / Policies / Announcements with previews
          ============================================================ */}
      <section className="section-bg-alt">
        <div className="page-wrapper">
          <div className="section" style={{ borderTop: "none" }}>
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">More disclosures</span>
                <h2>Governance, policies &amp; announcements</h2>
                <p>
                  The rest of the disclosure library — who oversees Arknine,
                  the policies that govern it, and every material update filed
                  with the exchange.
                </p>
              </div>
            </RevealOnScroll>

            <div className="ir-bento">
              {/* ---------- Governance ---------- */}
              <RevealOnScroll className="ir-bento__slot ir-bento__slot--governance">
                <Link
                  href="/investor-relations/governance"
                  className="ir-bento__tile"
                >
                  <div className="ir-bento__head">
                    <span className="ir-bento__index">02</span>
                    <div className="ir-bento__head-row">
                      <h3 className="ir-bento__title">Governance</h3>
                      <span className="ir-bento__arrow" aria-hidden="true">
                        <ArrowUpRight size={20} strokeWidth={1.8} />
                      </span>
                    </div>
                    <p className="ir-bento__desc">
                      Composition of the board, the four oversight committees,
                      and the latest shareholding pattern as filed with the
                      exchange.
                    </p>
                  </div>

                  <div className="ir-bento__body">
                    <span className="ir-bento__body-label">
                      Oversight bodies
                    </span>
                    <div className="ir-bento__chips">
                      {COMMITTEES.map((c) => (
                        <span key={c} className="ir-bento__chip">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>

              {/* ---------- Policies ---------- */}
              <RevealOnScroll
                delay={1}
                className="ir-bento__slot ir-bento__slot--policies"
              >
                <Link
                  href="/investor-relations/policies"
                  className="ir-bento__tile"
                >
                  <div className="ir-bento__head">
                    <span className="ir-bento__index">03</span>
                    <div className="ir-bento__head-row">
                      <h3 className="ir-bento__title">Policies</h3>
                      <span className="ir-bento__arrow" aria-hidden="true">
                        <ArrowUpRight size={20} strokeWidth={1.8} />
                      </span>
                    </div>
                    <p className="ir-bento__desc">
                      The framework of corporate policies that defines how
                      Arknine governs itself, discloses material information,
                      and manages risk.
                    </p>
                  </div>

                  <div className="ir-bento__body">
                    <span className="ir-bento__body-label">
                      Recently updated
                    </span>
                    <div className="ir-bento__list">
                      {latestPolicies.length === 0 ? (
                        <p className="ir-bento__empty">
                          No policies published yet.
                        </p>
                      ) : (
                        latestPolicies.map((p) => (
                          <div key={p.id} className="ir-bento__list-item">
                            <span className="ir-bento__list-item-title">
                              {p.title}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>

              {/* ---------- Announcements ---------- */}
              <RevealOnScroll
                delay={2}
                className="ir-bento__slot ir-bento__slot--announcements"
              >
                <Link
                  href="/investor-relations/announcements"
                  className="ir-bento__tile"
                >
                  <div className="ir-bento__head">
                    <span className="ir-bento__index">04</span>
                    <div className="ir-bento__head-row">
                      <h3 className="ir-bento__title">Announcements</h3>
                      <span className="ir-bento__arrow" aria-hidden="true">
                        <ArrowUpRight size={20} strokeWidth={1.8} />
                      </span>
                    </div>
                    <p className="ir-bento__desc">
                      Stock exchange filings, regulatory disclosures, and
                      material corporate updates in reverse-chronological
                      order.
                    </p>
                  </div>

                  <div className="ir-bento__body">
                    <span className="ir-bento__body-label">Latest filings</span>
                    <div className="ir-bento__list">
                      {latestAnnouncements.length === 0 ? (
                        <p className="ir-bento__empty">
                          No announcements yet.
                        </p>
                      ) : (
                        latestAnnouncements.map((a) => (
                          <div key={a.id} className="ir-bento__list-item">
                            <span className="ir-bento__list-item-title">
                              {a.title}
                            </span>
                            <time className="ir-bento__list-item-date">
                              {formatShortDate(a.date) ?? ""}
                            </time>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </Link>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
