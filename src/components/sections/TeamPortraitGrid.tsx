/**
 * TeamPortraitGrid
 * ----------------
 * Reusable grid of team-portrait cards (large image + name + role).
 * Wraps the .team-portraits CSS classes used by the About page so the
 * Governance page (and any other team display) gets the identical look.
 *
 * Used on: /about (Board + KMP), /investor-relations/governance.
 *
 * Variants:
 *   - default → 2 / 3 / 5 column responsive grid
 *   - compact → 2-column grid capped at 480px wide (for KMP / committee groups)
 *
 * Server component. RevealOnScroll inside is the only client leaf.
 */
import Link from "next/link";
import Image from "next/image";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import type { TeamMemberFromCMS } from "@/lib/strapi";

interface TeamPortraitGridProps {
  members: TeamMemberFromCMS[];
  variant?: "default" | "compact";
  /**
   * When true (default), portraits link to /about/team/[slug] for members
   * whose `hasProfilePage` flag is true. Members with `hasProfilePage: false`
   * always render as a static (non-clickable) card regardless of this prop.
   */
  linkToProfile?: boolean;
}

export function TeamPortraitGrid({
  members,
  variant = "default",
  linkToProfile = true,
}: TeamPortraitGridProps) {
  const gridClass = `team-portraits${variant === "compact" ? " team-portraits--kmp" : ""}`;
  const sizes =
    variant === "compact"
      ? "(max-width: 640px) 50vw, 240px"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw";

  return (
    <div className={gridClass}>
      {members.map((member, i) => {
        const linked = linkToProfile && member.hasProfilePage;
        return (
          <RevealOnScroll
            key={member.slug}
            delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}
          >
            {linked ? (
              <Link
                href={`/about/team/${member.slug}`}
                className="team-portrait"
              >
                <PortraitContent member={member} sizes={sizes} />
              </Link>
            ) : (
              <div className="team-portrait team-portrait--static">
                <PortraitContent member={member} sizes={sizes} />
              </div>
            )}
          </RevealOnScroll>
        );
      })}
    </div>
  );
}

function PortraitContent({
  member,
  sizes,
}: {
  member: TeamMemberFromCMS;
  sizes: string;
}) {
  return (
    <>
      <div className="team-portrait__image">
        {member.imageSrc ? (
          <Image
            src={member.imageSrc}
            alt={member.name}
            fill
            sizes={sizes}
          />
        ) : (
          <div className="team-portrait__initials" aria-hidden="true">
            {member.initials}
          </div>
        )}
      </div>
      <div className="team-portrait__info">
        <h3 className="team-portrait__name">{member.name}</h3>
        <span className="team-portrait__role">{member.role}</span>
      </div>
    </>
  );
}
