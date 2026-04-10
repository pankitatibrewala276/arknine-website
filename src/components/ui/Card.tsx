import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  accent?: boolean;
  static?: boolean;
}

export function Card({
  children,
  className,
  compact = false,
  accent = false,
  static: isStatic = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "card",
        compact && "card-compact",
        accent && "card-accent",
        isStatic && "card-static",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardIconProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success";
  className?: string;
}

export function CardIcon({
  children,
  variant = "primary",
  className,
}: CardIconProps) {
  return (
    <div className={cn("card-icon", variant, className)}>{children}</div>
  );
}
