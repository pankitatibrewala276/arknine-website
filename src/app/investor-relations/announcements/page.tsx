import { Metadata } from "next";
import { fetchArkDocuments } from "@/lib/strapi";
import { DarkHero } from "@/components/shared/DarkHero";
import { DocumentTimeline } from "@/components/sections/ir/DocumentTimeline";

export const metadata: Metadata = {
  title: "Announcements — Investor Relations",
  description:
    "Stock exchange filings, corporate updates, and regulatory disclosures from Arknine Technologies Limited.",
};

export default async function AnnouncementsPage() {
  const documents = await fetchArkDocuments("Announcement", "publishDate:desc");

  return (
    <>
      <DarkHero
        eyebrow="Investor Relations"
        title="Announcements"
        description="Regulatory filings, corporate updates, and material disclosures from Arknine Technologies."
      />

      <DocumentTimeline
        documents={documents}
        searchPlaceholder="Search announcements..."
        searchAriaLabel="Search announcements"
        yearFilterAriaLabel="Filter announcements by year"
        countNoun={{ singular: "announcement", plural: "announcements" }}
        emptyNoneTitle="No announcements published yet"
        emptyNoneDescription="Stock exchange filings and corporate updates will appear here as they are published."
        emptyFilteredTitle="No announcements match your filters"
        emptyFilteredDescription="Try a different keyword, change the year, or clear your filters."
      />
    </>
  );
}
