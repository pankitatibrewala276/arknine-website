/**
 * StatCard
 * --------
 * Purpose: Display a key metric with label and optional trend.
 * Used on: Home (scale & growth), IR Home (key financials), About (company stats)
 * Visual: card-compact with large number, label below, optional badge for trend
 */
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string;
  label: string;
  trend?: { direction: "up" | "down" | "neutral"; text: string };
  className?: string;
}

export function StatCard({ value, label, trend, className }: StatCardProps) {
  const trendColor =
    trend?.direction === "up"
      ? "badge-success"
      : trend?.direction === "down"
        ? "badge-failure"
        : "badge-neutral";

  return (
    <div className={cn("card card-compact", className)}>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-h2)",
          fontWeight: 400,
          lineHeight: 1.2,
          color: "var(--color-charcoal)",
          marginBottom: "var(--space-2)",
        }}
      >
        {value}
      </div>
      <div className="body-sm text-stone" style={{ marginBottom: trend ? "var(--space-3)" : 0 }}>
        {label}
      </div>
      {trend && (
        <span className={cn("badge badge-dot", trendColor)}>
          {trend.text}
        </span>
      )}
    </div>
  );
}
