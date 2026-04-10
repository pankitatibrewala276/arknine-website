/**
 * Governance — static data
 * ------------------------
 * Shareholding pattern + committee descriptions used by /investor-relations/governance.
 * Replace with CMS-driven data when the schema is added.
 */

export interface ShareholdingRow {
  category: string;
  shares: number;
  percentage: number;
}

export interface ShareholdingPattern {
  asOf: string;
  totalShares: number;
  rows: ShareholdingRow[];
}

export const shareholdingPattern: ShareholdingPattern = {
  asOf: "Q3 FY26 — 31 December 2025",
  totalShares: 12_500_000,
  rows: [
    { category: "Promoter & Promoter Group", shares: 9_375_000, percentage: 75.0 },
    { category: "Public — Mutual Funds", shares: 312_500, percentage: 2.5 },
    { category: "Public — Foreign Portfolio Investors", shares: 250_000, percentage: 2.0 },
    { category: "Public — Bodies Corporate", shares: 187_500, percentage: 1.5 },
    { category: "Public — Resident Individuals", shares: 2_125_000, percentage: 17.0 },
    { category: "Public — Others", shares: 250_000, percentage: 2.0 },
  ],
};

export interface CommitteeMeta {
  key: "audit" | "nrc" | "stakeholder" | "csr";
  title: string;
  eyebrow: string;
  description: string;
}

export const committees: CommitteeMeta[] = [
  {
    key: "audit",
    title: "Audit Committee",
    eyebrow: "Compliance",
    description:
      "Oversees the integrity of financial reporting, the appointment and performance of statutory auditors, and the effectiveness of internal control systems.",
  },
  {
    key: "nrc",
    title: "Nomination & Remuneration Committee",
    eyebrow: "Talent",
    description:
      "Recommends the appointment of directors and senior management, and frames the remuneration policy for the board, key personnel, and other employees.",
  },
  {
    key: "stakeholder",
    title: "Stakeholders Relationship Committee",
    eyebrow: "Stakeholders",
    description:
      "Reviews and resolves the grievances of shareholders, debenture holders, and other security holders, including matters relating to share transfers and dividends.",
  },
  {
    key: "csr",
    title: "Corporate Social Responsibility Committee",
    eyebrow: "Responsibility",
    description:
      "Formulates and recommends the CSR policy, monitors implementation, and ensures that CSR spending aligns with the company's stated focus areas.",
  },
];
