/**
 * ClientLogo
 * ----------
 * Purpose: Display a client logo in a grid of logos.
 * Used on: Home (Our Clients section)
 * Visual: Muted image in a bordered container, grayscale → color on hover
 */
import { cn } from "@/lib/utils";

interface ClientLogoProps {
  name: string;
  logoSrc: string;
  className?: string;
}

export function ClientLogo({ name, logoSrc, className }: ClientLogoProps) {
  return (
    <div
      className={cn("card card-compact card-static", className)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6) var(--space-4)",
      }}
    >
      <img
        src={logoSrc}
        alt={name}
        style={{
          maxHeight: "40px",
          maxWidth: "120px",
          objectFit: "contain",
          filter: "grayscale(100%)",
          opacity: 0.6,
          transition: "filter var(--duration-normal) var(--ease-out-quart), opacity var(--duration-normal) var(--ease-out-quart)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.filter = "grayscale(0%)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.filter = "grayscale(100%)";
          e.currentTarget.style.opacity = "0.6";
        }}
      />
    </div>
  );
}
