import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  src?: string;
  alt?: string;
  className?: string;
}

export function Avatar({
  initials,
  size = "md",
  src,
  alt,
  className,
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt || initials}
        className={cn(
          "avatar",
          size === "sm" && "avatar-sm",
          size === "lg" && "avatar-lg",
          className
        )}
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      className={cn(
        "avatar",
        size === "sm" && "avatar-sm",
        size === "lg" && "avatar-lg",
        className
      )}
    >
      {initials}
    </div>
  );
}
