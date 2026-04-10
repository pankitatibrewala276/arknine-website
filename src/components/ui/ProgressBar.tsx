interface ProgressBarProps {
  value: number;
  color?: "primary" | "success" | "warning";
}

const colorMap = {
  primary: "var(--color-primary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
};

export function ProgressBar({ value, color = "primary" }: ProgressBarProps) {
  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: colorMap[color],
        }}
      />
    </div>
  );
}
