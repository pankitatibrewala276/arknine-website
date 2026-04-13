"use client";

/**
 * GovernanceTabs
 * --------------
 * Client tab controller for the Governance page.
 * Three tabs: Board, Committees, Shareholding Pattern.
 *
 * Reuses shared design-system components throughout:
 *   - <TabBar />            for the segmented control
 *   - <TeamPortraitGrid />  for board + each committee
 *   - <DocumentTimeline />  for the Shareholding Pattern card list
 */
import { useState } from "react";
import { TabBar } from "@/components/shared/TabBar";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TeamPortraitGrid } from "@/components/sections/TeamPortraitGrid";
import { DocumentTimeline } from "@/components/sections/ir/DocumentTimeline";
import type { TeamMemberFromCMS, ArkDocument } from "@/lib/strapi";
import { committees as committeeMeta, type CommitteeMeta } from "@/data/governance";

type GovernanceTab = "board" | "committees" | "shareholding";

const TABS = [
  { label: "Board", value: "board" },
  { label: "Committees", value: "committees" },
  { label: "Shareholding Pattern", value: "shareholding" },
] as const satisfies ReadonlyArray<{ label: string; value: GovernanceTab }>;

interface GovernanceTabsProps {
  board: TeamMemberFromCMS[];
  committees: Record<CommitteeMeta["key"], TeamMemberFromCMS[]>;
  shareholdingDocs: ArkDocument[];
}

export function GovernanceTabs({
  board,
  committees,
  shareholdingDocs,
}: GovernanceTabsProps) {
  const [active, setActive] = useState<GovernanceTab>("board");

  return (
    <>
      {/* Tab strip — same .blog-nav layout as blog + announcements */}
      <div className="blog-nav">
        <div className="blog-nav__inner page-wrapper">
          <div className="blog-nav__seg">
            <TabBar
              tabs={TABS}
              activeTab={active}
              onChange={setActive}
              ariaLabel="Governance sections"
            />
          </div>
          <span />
        </div>
      </div>

      {/* Tab content */}
      <div className="page-wrapper">
        {active === "board" && <BoardSection board={board} />}
        {active === "committees" && (
          <CommitteesSection committees={committees} />
        )}
        {active === "shareholding" && (
          <ShareholdingSection documents={shareholdingDocs} />
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  BOARD                                                               */
/* ------------------------------------------------------------------ */
function BoardSection({ board }: { board: TeamMemberFromCMS[] }) {
  return (
    <div
      className="section"
      style={{ borderTop: "none", paddingTop: "var(--space-12)" }}
    >
      <RevealOnScroll>
        <div className="section-header">
          <span className="eyebrow">Leadership</span>
          <h2>Board of Directors</h2>
          <p>
            Independent and executive directors who provide strategic
            direction and stewardship to Arknine Technologies.
          </p>
        </div>
      </RevealOnScroll>

      {board.length > 0 ? (
        <TeamPortraitGrid members={board} />
      ) : (
        <p className="body-sm" style={{ color: "var(--color-stone)" }}>
          Board composition will be published shortly.
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMMITTEES                                                          */
/* ------------------------------------------------------------------ */
function CommitteesSection({
  committees,
}: {
  committees: Record<CommitteeMeta["key"], TeamMemberFromCMS[]>;
}) {
  return (
    <>
      {committeeMeta.map((c, i) => {
        const members = committees[c.key];
        return (
          <div
            key={c.key}
            className="section"
            style={
              i === 0
                ? { borderTop: "none", paddingTop: "var(--space-12)" }
                : undefined
            }
          >
            <RevealOnScroll>
              <div className="section-header">
                <span className="eyebrow">{c.eyebrow}</span>
                <h2>{c.title}</h2>
                <p>{c.description}</p>
              </div>
            </RevealOnScroll>

            {members.length > 0 ? (
              <TeamPortraitGrid members={members} variant="compact" />
            ) : (
              <p className="body-sm" style={{ color: "var(--color-stone)" }}>
                Committee composition will be published shortly.
              </p>
            )}
          </div>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  SHAREHOLDING PATTERN — card list (reuses DocumentTimeline)          */
/* ------------------------------------------------------------------ */
function ShareholdingSection({ documents }: { documents: ArkDocument[] }) {
  return (
    <div
      className="section"
      style={{ borderTop: "none", paddingTop: "var(--space-12)" }}
    >
      <RevealOnScroll>
        <div className="section-header">
          <span className="eyebrow">Capital Structure</span>
          <h2>Shareholding pattern</h2>
          <p>
            Quarterly shareholding pattern filings as submitted to the stock
            exchanges. Open any filing to view the full breakdown.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={1}>
        <DocumentTimeline
          documents={documents}
          layout="inline"
          searchPlaceholder="Search filings..."
          searchAriaLabel="Search shareholding pattern filings"
          yearFilterAriaLabel="Filter shareholding filings by year"
          countNoun={{ singular: "filing", plural: "filings" }}
          emptyNoneTitle="No filings published yet"
          emptyNoneDescription="Quarterly shareholding pattern filings will appear here as they are submitted to the exchanges."
          emptyFilteredTitle="No filings match your filters"
          emptyFilteredDescription="Try a different keyword, change the year, or clear your filters."
        />
      </RevealOnScroll>
    </div>
  );
}
