/**
 * AddressCard
 * -----------
 * Purpose: Display an office address with label, address lines, and optional phone/email.
 * Used on: Contact page (All Addresses section)
 * Visual: card-compact with icon + address details
 */
import { MapPin, Phone, Mail } from "lucide-react";

interface AddressCardProps {
  label: string;
  lines: string[];
  phone?: string;
  email?: string;
}

export function AddressCard({ label, lines, phone, email }: AddressCardProps) {
  return (
    <div className="card card-compact card-static">
      <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
        <div className="card-icon primary" style={{ marginBottom: 0, flexShrink: 0 }}>
          <MapPin size={18} />
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>{label}</div>
          {lines.map((line, i) => (
            <div key={i} className="body-sm text-stone">{line}</div>
          ))}
          {phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
              <Phone size={14} style={{ color: "var(--color-cool-grey)" }} />
              <a href={`tel:${phone}`} className="link" style={{ fontSize: "var(--text-body-sm)" }}>
                {phone}
              </a>
            </div>
          )}
          {email && (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
              <Mail size={14} style={{ color: "var(--color-cool-grey)" }} />
              <a href={`mailto:${email}`} className="link" style={{ fontSize: "var(--text-body-sm)" }}>
                {email}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
