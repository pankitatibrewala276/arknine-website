import { Metadata } from "next";
import { fetchTeamMembers, fetchArkDocuments } from "@/lib/strapi";
import { DarkHero } from "@/components/shared/DarkHero";
import { GovernanceTabs } from "@/components/sections/ir/GovernanceTabs";

export const metadata: Metadata = {
  title: "Governance — Investor Relations",
  description:
    "Board of directors, committees, and shareholding pattern of Arknine Technologies Limited.",
};

export default async function GovernancePage() {
  const [all, shareholdingDocs] = await Promise.all([
    fetchTeamMembers(),
    fetchArkDocuments("Shareholding Pattern", "publishDate:desc"),
  ]);

  const board = all.filter((m) => m.type === "board");
  const committees = {
    audit: all.filter((m) => m.type === "audit"),
    nrc: all.filter((m) => m.type === "nrc"),
    stakeholder: all.filter((m) => m.type === "stakeholder"),
    csr: all.filter((m) => m.type === "csr"),
  };

  return (
    <>
      <DarkHero
        eyebrow="Investor Relations"
        title="Governance"
        description="The people, committees, and capital structure that anchor Arknine Technologies — composition of the board, oversight committees, and the latest filed shareholding pattern."
      />

      <GovernanceTabs
        board={board}
        committees={committees}
        shareholdingDocs={shareholdingDocs}
      />
    </>
  );
}
