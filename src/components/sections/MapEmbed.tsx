/**
 * MapEmbed
 * --------
 * Purpose: Embedded Google Map for an address.
 * Used on: Contact page
 * Visual: Rounded container with iframe map, respects design system radii.
 */
interface MapEmbedProps {
  title: string;
  embedUrl: string;
  height?: string;
}

export function MapEmbed({ title, embedUrl, height = "400px" }: MapEmbedProps) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        border: "1px solid var(--color-mist)",
        height,
      }}
    >
      <iframe
        title={title}
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
