import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  className?: string;
}

export function Tooltip({ children, text, className }: TooltipProps) {
  return (
    <span className={cn("tooltip-wrap", className)}>
      {children}
      <span className="tooltip">{text}</span>
    </span>
  );
}
