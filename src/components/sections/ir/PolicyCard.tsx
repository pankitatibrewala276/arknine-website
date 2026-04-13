/**
 * PolicyCard
 * ----------
 * Purpose: Display a corporate policy with name + download link.
 * Used on: IR Policies page
 * Visual: card-compact with policy name and ghost download button
 */
import { FileText, Download } from "lucide-react";

interface PolicyCardProps {
  name: string;
  documentUrl: string;
}

export function PolicyCard({ name, documentUrl }: PolicyCardProps) {
  return (
    <div className="card card-compact card-static">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <div className="card-icon primary" style={{ marginBottom: 0 }}>
            <FileText size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: "var(--text-body-sm)" }}>{name}</span>
        </div>
        <a
          href={documentUrl}
          className="btn btn-ghost btn-sm btn-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Download ${name}`}
        >
          <Download size={16} />
        </a>
      </div>
    </div>
  );
}
