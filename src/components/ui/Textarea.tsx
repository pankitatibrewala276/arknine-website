import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, hint, error, className, id, ...props }, ref) {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={textareaId} className="form-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn("input", error && "input-error", className)}
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
  }
);
