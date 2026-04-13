"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <div
      className={cn("flex-row items-center justify-between", className)}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
    >
      {label && <span className="body-sm">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={cn("toggle", checked && "active")}
        onClick={() => onChange(!checked)}
      />
    </div>
  );
}
