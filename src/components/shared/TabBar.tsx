"use client";

/**
 * TabBar
 * ------
 * Reusable segmented control / tab bar.
 * Wraps the .blog-nav__seg-track classes used by /gallery/blogs and the IR pages
 * so the same pill-track tab pattern is consistent across the site.
 *
 * Used on: /gallery/blogs (category tabs), /investor-relations/announcements (year filter),
 *          /investor-relations/governance (Board / Committees / Shareholding).
 *
 * Generic over the value type so the consumer can use string unions or any literal type.
 */

interface TabBarOption<V extends string> {
  label: string;
  value: V;
}

interface TabBarProps<V extends string> {
  tabs: ReadonlyArray<TabBarOption<V>>;
  activeTab: V;
  onChange: (value: V) => void;
  ariaLabel?: string;
  className?: string;
}

export function TabBar<V extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = "Tabs",
  className,
}: TabBarProps<V>) {
  return (
    <div
      className={`blog-nav__seg-track${className ? ` ${className}` : ""}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`blog-nav__seg-item ${isActive ? "blog-nav__seg-item--active" : ""}`}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
