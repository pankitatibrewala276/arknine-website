/**
 * BrandCard
 * ---------
 * Purpose: Showcase a brand (Dukaan Dost / Monotone) with description + link.
 * Used on: Home (Our Brands section)
 * Visual: card with brand name as h3, description, and outline button
 */
interface BrandCardProps {
  name: string;
  description: string;
  url: string;
}

export function BrandCard({ name, description, url }: BrandCardProps) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p style={{ marginBottom: "var(--space-6)" }}>{description}</p>
      <a href={url} className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
        Visit Website
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </a>
    </div>
  );
}
