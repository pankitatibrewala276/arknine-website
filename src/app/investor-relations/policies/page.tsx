import { Metadata } from "next";
import { fetchArkDocuments } from "@/lib/strapi";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { DarkHero } from "@/components/shared/DarkHero";
import { PolicyGrid } from "@/components/sections/ir/PolicyGrid";

export const metadata: Metadata = {
  title: "Policies — Investor Relations",
  description:
    "Corporate governance policies of Arknine Technologies Limited. Access and download policy documents covering governance, ethics, risk, and disclosure.",
};

export default async function PoliciesPage() {
  const documents = await fetchArkDocuments("Policy");

  return (
    <>
      <DarkHero
        eyebrow="Investor Relations"
        title="Corporate governance policies"
        description="The policies that guide how Arknine Technologies operates, discloses, and is governed."
      />

      {/* ============================================================
          POLICY GRID — Search + cards
          ============================================================ */}
      <section className="page-wrapper">
        <div className="section" style={{ borderTop: "none", paddingTop: "var(--space-12)" }}>
          <RevealOnScroll>
            <PolicyGrid documents={documents} />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
