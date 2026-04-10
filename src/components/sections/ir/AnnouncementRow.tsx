/**
 * AnnouncementRow
 * ---------------
 * Purpose: Single announcement entry with date, title, optional badge, and PDF link.
 * Used on: IR Announcements page, IR Home (latest announcements)
 * Visual: Bordered list item with date badge on left, title, and download
 */
import { ExternalLink } from "lucide-react";

interface AnnouncementRowProps {
  date: string;
  title: string;
  tag?: string;
  documentUrl: string;
}

export function AnnouncementRow({
  date,
  title,
  tag,
  documentUrl,
}: AnnouncementRowProps) {
  return (
    <a
      href={documentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="card card-compact card-static"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        textDecoration: "none",
        cursor: "pointer",
        transition: "border-color var(--duration-fast) var(--ease-out-quart)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "var(--color-primary-ghost-hover)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "var(--color-mist)";
      }}
    >
      <div
        className="caption"
        style={{
          minWidth: "80px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {date}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: "var(--text-body-sm)",
            color: "var(--color-charcoal)",
            marginBottom: tag ? "var(--space-1)" : 0,
          }}
        >
          {title}
        </div>
        {tag && <span className="badge badge-neutral">{tag}</span>}
      </div>
      <ExternalLink
        size={16}
        style={{ color: "var(--color-cool-grey)", flexShrink: 0 }}
      />
    </a>
  );
}
