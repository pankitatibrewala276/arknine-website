/**
 * EmptyState
 * ----------
 * Reusable empty state with the stacked-paper + magnifying-glass illustration.
 * Used by: blog listing, IR policies, IR announcements, and any future
 *          listing that needs a "no data / no matches" state.
 *
 * Server component. Pass an action node (e.g. a clear-filters button) when
 * the empty state is the result of a user filter.
 */
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="blog-empty">
      <svg
        className="blog-empty__illustration"
        width="200"
        height="140"
        viewBox="0 0 200 140"
        fill="none"
        aria-hidden="true"
      >
        <rect x="40" y="28" width="120" height="90" rx="8" fill="var(--color-off-white)" stroke="var(--color-mist)" strokeWidth="1.5" />
        <rect x="48" y="20" width="120" height="90" rx="8" fill="var(--color-pure-white)" stroke="var(--color-mist)" strokeWidth="1.5" />
        <rect x="56" y="12" width="120" height="90" rx="8" fill="var(--color-pure-white)" stroke="var(--color-mist)" strokeWidth="1.5" />
        <rect x="72" y="32" width="48" height="4" rx="2" fill="var(--color-mist)" />
        <rect x="72" y="44" width="72" height="3" rx="1.5" fill="var(--color-off-white)" />
        <rect x="72" y="54" width="60" height="3" rx="1.5" fill="var(--color-off-white)" />
        <rect x="72" y="64" width="66" height="3" rx="1.5" fill="var(--color-off-white)" />
        <circle cx="148" cy="88" r="18" stroke="var(--color-cool-grey)" strokeWidth="2" fill="none" opacity="0.5" />
        <line x1="161" y1="101" x2="174" y2="114" stroke="var(--color-cool-grey)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <text x="143" y="95" fontSize="18" fontWeight="600" fill="var(--color-cool-grey)" opacity="0.4" textAnchor="middle" fontFamily="var(--font-body)">?</text>
      </svg>
      <h3 className="blog-empty__title">{title}</h3>
      <p className="blog-empty__text">{description}</p>
      {action}
    </div>
  );
}
