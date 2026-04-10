/**
 * MetricRow
 * ---------
 * Purpose: Horizontal row of 2–4 StatCards in a responsive grid.
 * Used on: Home, IR Home, About
 * Visual: grid-2 or grid-4 depending on count
 */
import { StatCard } from "./StatCard";

interface Metric {
  value: string;
  label: string;
  trend?: { direction: "up" | "down" | "neutral"; text: string };
}

interface MetricRowProps {
  metrics: Metric[];
  columns?: 2 | 3 | 4;
}

export function MetricRow({ metrics, columns }: MetricRowProps) {
  const gridClass =
    columns === 2
      ? "grid-2"
      : columns === 3
        ? "grid-3"
        : metrics.length <= 2
          ? "grid-2"
          : metrics.length === 3
            ? "grid-3"
            : "grid-4";

  return (
    <div className={gridClass}>
      {metrics.map((metric, i) => (
        <StatCard key={i} {...metric} />
      ))}
    </div>
  );
}
