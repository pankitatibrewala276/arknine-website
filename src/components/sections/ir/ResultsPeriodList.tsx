"use client";

/**
 * ResultsPeriodList
 * -----------------
 * Tabbed results browser, modeled on the institutional IR pattern used by
 * Eternal: a top-level segmented control switches between Half-Yearly,
 * Annual, and Archive views. Within each view, documents are grouped into
 * year sections with sub-blocks (HY1 / HY2 / Annual) so investors can scan
 * by reporting period instead of hunting through a flat list.
 *
 * Used on: /investor-relations/results
 *
 * Pattern: institutional, document-first — no card boxes, hairline-separated
 * year sections, chip links for individual document downloads.
 */
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ArkDocument, ArkDocumentType } from "@/lib/strapi";
import { TabBar } from "@/components/shared/TabBar";
import { EmptyState } from "@/components/shared/EmptyState";

interface ResultsPeriodListProps {
  documents: ArkDocument[];
}

/* ------------------------------------------------------------------ */
/*  Type ordering + display labels                                      */
/* ------------------------------------------------------------------ */
const TYPE_ORDER: ArkDocumentType[] = [
  "Shareholder's Letters and Results",
  "Annual Report",
  "Earnings Call Replay",
  "Earnings Call Transcript",
  "KPI Data Book",
  "Archive",
];

const TYPE_LABELS: Partial<Record<ArkDocumentType, string>> = {
  "Shareholder's Letters and Results": "Shareholder Letter",
  "Annual Report": "Annual Report",
  "Earnings Call Replay": "Call Replay",
  "Earnings Call Transcript": "Transcript",
  "KPI Data Book": "KPI Data Book",
  Archive: "Archive",
};

/* ------------------------------------------------------------------ */
/*  Tabs                                                                */
/* ------------------------------------------------------------------ */
type TabKey = "half" | "annual" | "archive";

const TABS: ReadonlyArray<{ label: string; value: TabKey }> = [
  { label: "Half-Yearly", value: "half" },
  { label: "Annual", value: "annual" },
  { label: "Archive", value: "archive" },
];

// Latest N financial years stay in the main tabs; everything older drops
// into the Archive tab so the active views stay scannable.
const ACTIVE_YEARS_COUNT = 3;

/* ------------------------------------------------------------------ */
/*  Grouping                                                            */
/* ------------------------------------------------------------------ */
interface YearGroup {
  year: number;
  hy1: ArkDocument[];
  hy2: ArkDocument[];
  annual: ArkDocument[];
  archive: ArkDocument[];
}

function isArchiveDoc(doc: ArkDocument): boolean {
  return doc.documentType === "Archive";
}

function isAnnualDoc(doc: ArkDocument): boolean {
  return doc.documentType === "Annual Report" || !doc.duration;
}

function sortDocsByType(a: ArkDocument, b: ArkDocument): number {
  const ai = a.documentType ? TYPE_ORDER.indexOf(a.documentType) : 99;
  const bi = b.documentType ? TYPE_ORDER.indexOf(b.documentType) : 99;
  return ai - bi;
}

function buildYearGroups(docs: ArkDocument[]): YearGroup[] {
  const map = new Map<number, YearGroup>();
  for (const doc of docs) {
    // Group year-less docs under year 0 so Archive uploads without a year
    // still surface in the Archive tab.
    const year = doc.year ?? 0;
    let group = map.get(year);
    if (!group) {
      group = { year, hy1: [], hy2: [], annual: [], archive: [] };
      map.set(year, group);
    }
    if (isArchiveDoc(doc)) {
      group.archive.push(doc);
    } else if (isAnnualDoc(doc)) {
      group.annual.push(doc);
    } else if (doc.duration === "HY2") {
      group.hy2.push(doc);
    } else {
      group.hy1.push(doc);
    }
  }
  for (const g of map.values()) {
    g.archive.sort(sortDocsByType);
    g.hy1.sort(sortDocsByType);
    g.hy2.sort(sortDocsByType);
    g.annual.sort(sortDocsByType);
  }
  return Array.from(map.values()).sort((a, b) => b.year - a.year);
}

function fyLabel(year: number): string {
  if (!year) return "Undated";
  return `FY${String(year).slice(-2)}`;
}

/* ------------------------------------------------------------------ */
/*  Document chips                                                      */
/* ------------------------------------------------------------------ */
function DocChips({ docs }: { docs: ArkDocument[] }) {
  return (
    <div className="period-row__chips">
      {docs.map((doc) => (
        <a
          key={doc.id}
          href={doc.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="period-chip"
          aria-label={`Open ${doc.title} in a new tab`}
        >
          <span className="period-chip__label">
            {doc.documentType === "Archive"
              ? doc.title
              : doc.documentType
                ? (TYPE_LABELS[doc.documentType] ?? doc.documentType)
                : "Document"}
          </span>
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
            className="period-chip__arrow"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable year section primitives                                    */
/* ------------------------------------------------------------------ */
function YearSection({
  year,
  children,
}: {
  year: number;
  children: React.ReactNode;
}) {
  return (
    <section className="year-section" aria-label={fyLabel(year)}>
      <header className="year-section__header">
        <h3 className="year-section__title">{fyLabel(year)}</h3>
      </header>
      <div className="year-section__body">{children}</div>
    </section>
  );
}

function HalfBlock({
  label,
  docs,
}: {
  label: string;
  docs: ArkDocument[];
}) {
  if (docs.length === 0) return null;
  return (
    <div className="half-block">
      <span className="half-block__label">{label}</span>
      <DocChips docs={docs} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tab views                                                           */
/* ------------------------------------------------------------------ */
function HalfYearlyView({ groups }: { groups: YearGroup[] }) {
  const visible = groups.filter((g) => g.hy1.length || g.hy2.length);
  if (visible.length === 0) {
    return (
      <EmptyState
        title="No half-yearly results yet"
        description="Shareholder letters, earnings calls, and KPI books will appear here as each half closes."
      />
    );
  }
  return (
    <div className="results-sections results-sections--spacious">
      {visible.map((g) => (
        <YearSection key={g.year} year={g.year}>
          <HalfBlock label="First half (HY1)" docs={g.hy1} />
          <HalfBlock label="Second half (HY2)" docs={g.hy2} />
        </YearSection>
      ))}
    </div>
  );
}

function AnnualView({ groups }: { groups: YearGroup[] }) {
  const visible = groups.filter((g) => g.annual.length);
  if (visible.length === 0) {
    return (
      <EmptyState
        title="No annual reports yet"
        description="Annual reports will appear here as they are published each year."
      />
    );
  }
  return (
    <div className="results-sections">
      {visible.map((g) => (
        <YearSection key={g.year} year={g.year}>
          <DocChips docs={g.annual} />
        </YearSection>
      ))}
    </div>
  );
}

function ArchiveView({ groups }: { groups: YearGroup[] }) {
  const visible = groups.filter(
    (g) => g.archive.length || g.annual.length || g.hy1.length || g.hy2.length
  );
  if (visible.length === 0) {
    return (
      <EmptyState
        title="Archive is empty"
        description="Older results move to the archive as new reporting periods are published."
      />
    );
  }
  return (
    <div className="results-sections">
      {visible.map((g) => (
        <YearSection key={g.year} year={g.year}>
          {g.archive.length > 0 && <DocChips docs={g.archive} />}
          <HalfBlock label="Annual" docs={g.annual} />
          <HalfBlock label="First half (HY1)" docs={g.hy1} />
          <HalfBlock label="Second half (HY2)" docs={g.hy2} />
        </YearSection>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */
export function ResultsPeriodList({ documents }: ResultsPeriodListProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("half");

  const allGroups = useMemo(() => buildYearGroups(documents), [documents]);

  const { activeGroups, archiveGroups } = useMemo(() => {
    if (allGroups.length === 0) {
      return { activeGroups: [] as YearGroup[], archiveGroups: [] as YearGroup[] };
    }
    // Active tabs (Half-Yearly, Annual) only show the most recent years with
    // a real `year` value. Archive-typed docs are excluded here — they always
    // belong to the Archive tab regardless of year.
    const datedGroups = allGroups.filter((g) => g.year > 0);
    const recent = datedGroups.slice(0, ACTIVE_YEARS_COUNT);
    const older = datedGroups.slice(ACTIVE_YEARS_COUNT);

    // Archive tab combines: (a) older years (full content), (b) recent years
    // that contain Archive-typed docs (only their archive bucket — their HY
    // and Annual content already lives in the other tabs), and (c) any
    // year-less docs grouped under year 0.
    const recentArchiveOnly = recent
      .filter((g) => g.archive.length > 0)
      .map((g) => ({ ...g, hy1: [], hy2: [], annual: [] }));
    const undatedGroup = allGroups.find((g) => g.year === 0);

    const archiveGroups = [
      ...recentArchiveOnly,
      ...older,
      ...(undatedGroup ? [undatedGroup] : []),
    ].sort((a, b) => b.year - a.year);

    return { activeGroups: recent, archiveGroups };
  }, [allGroups]);

  if (allGroups.length === 0) {
    return (
      <EmptyState
        title="No results published yet"
        description="Half-yearly shareholder letters, earnings calls, and annual reports will appear here as they are published."
      />
    );
  }

  return (
    <div className="results-periods">
      <div className="blog-nav">
        <div className="blog-nav__inner page-wrapper page-wrapper--wide">
          <div className="blog-nav__seg">
            <TabBar
              tabs={TABS}
              activeTab={activeTab}
              onChange={setActiveTab}
              ariaLabel="Switch between half-yearly, annual, and archived results"
            />
          </div>
          <span aria-hidden="true" />
        </div>
      </div>

      <div className="page-wrapper page-wrapper--wide results-periods__content">
        {activeTab === "half" && <HalfYearlyView groups={activeGroups} />}
        {activeTab === "annual" && <AnnualView groups={activeGroups} />}
        {activeTab === "archive" && <ArchiveView groups={archiveGroups} />}
      </div>
    </div>
  );
}
