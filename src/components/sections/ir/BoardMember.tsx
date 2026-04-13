/**
 * BoardMember
 * -----------
 * Purpose: Display a board member or KMP with photo, name, role, bio.
 * Used on: IR Governance, About (Management section)
 * Visual: card with avatar (or image), name as h3, role as caption, bio as body-sm
 */
interface BoardMemberProps {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  initials: string;
}

export function BoardMember({
  name,
  role,
  bio,
  imageSrc,
  initials,
}: BoardMemberProps) {
  return (
    <div className="card">
      <div style={{ marginBottom: "var(--space-4)" }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            style={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="avatar avatar-lg">{initials}</div>
        )}
      </div>
      <h3>{name}</h3>
      <div className="caption" style={{ marginBottom: "var(--space-3)" }}>
        {role}
      </div>
      <p className="body-sm">{bio}</p>
    </div>
  );
}
