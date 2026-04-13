import { cn } from "@/lib/utils";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

type AlertVariant = "success" | "failure" | "warning" | "info";

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  className?: string;
}

const icons: Record<AlertVariant, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  failure: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

export function Alert({
  children,
  variant = "info",
  className,
}: AlertProps) {
  return (
    <div className={cn("alert", `alert-${variant}`, className)}>
      {icons[variant]}
      <div>{children}</div>
    </div>
  );
}
