/**
 * IRInfoCard
 * ----------
 * Purpose: Display key IR information (CIN, RTA, listed exchange, registrar, email).
 * Used on: IR Home page
 * Visual: card-compact with label-value pairs in a clean list
 */
interface InfoItem {
  label: string;
  value: string;
  href?: string;
}

interface IRInfoCardProps {
  title: string;
  items: InfoItem[];
}

export function IRInfoCard({ title, items }: IRInfoCardProps) {
  return (
    <div className="card card-compact card-static">
      <div
        className="eyebrow"
        style={{ marginBottom: "var(--space-4)" }}
      >
        {title}
      </div>
      <div className="flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)" }}>
            <span className="caption" style={{ color: "var(--color-cool-grey)" }}>
              {item.label}
            </span>
            {item.href ? (
              <a href={item.href} className="link" style={{ fontSize: "var(--text-body-sm)", textAlign: "right" }}>
                {item.value}
              </a>
            ) : (
              <span className="body-sm" style={{ fontWeight: 600, textAlign: "right" }}>
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
