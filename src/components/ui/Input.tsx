import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  inputSize?: "sm" | "md" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, inputSize = "md", className, id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "input",
          inputSize === "lg" && "input-lg",
          inputSize === "sm" && "input-sm",
          error && "input-error",
          className
        )}
        {...props}
      />
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && (
        <span className="form-hint" style={{ color: "var(--color-failure)" }}>
          {error}
        </span>
      )}
    </div>
  );
});
