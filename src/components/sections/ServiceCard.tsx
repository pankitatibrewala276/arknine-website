/**
 * ServiceCard
 * -----------
 * Purpose: Display a service offering with icon, title, description.
 * Used on: Home (Services section)
 * Visual: card with card-icon, h3 title, body-text description
 */
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconVariant?: "primary" | "secondary" | "success";
}

export function ServiceCard({
  icon,
  title,
  description,
  iconVariant = "primary",
}: ServiceCardProps) {
  return (
    <div className="card">
      <div className={`card-icon ${iconVariant}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
