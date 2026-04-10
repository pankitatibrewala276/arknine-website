import { cn } from "@/lib/utils";

type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "failure"
  | "warning"
  | "neutral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "primary",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        `badge-${variant}`,
        dot && "badge-dot",
        className
      )}
    >
      {children}
    </span>
  );
}
