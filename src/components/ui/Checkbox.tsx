import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, className, id, ...props }, ref) {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label className={cn("checkbox-group", className)} htmlFor={checkboxId}>
        <input ref={ref} type="checkbox" id={checkboxId} {...props} />
        <span className="body-sm">{label}</span>
      </label>
    );
  }
);
