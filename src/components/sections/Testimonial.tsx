/**
 * Testimonial
 * -----------
 * Purpose: Client quote card with avatar, name, role.
 * Used on: Home (testimonials section)
 * Visual: card card-accent with avatar row + quote text
 */
interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company?: string;
  initials: string;
}

export function Testimonial({
  quote,
  name,
  role,
  company,
  initials,
}: TestimonialProps) {
  return (
    <div className="card card-accent" style={{ maxWidth: "480px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          marginBottom: "var(--space-4)",
        }}
      >
        <div className="avatar">{initials}</div>
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
          <div className="caption">
            {role}
            {company && ` · ${company}`}
          </div>
        </div>
      </div>
      <p className="body-sm text-stone">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}
