import { cn } from "@/lib/utils";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: boolean;
  className?: string;
}

export function Skeleton({
  width,
  height = "14px",
  rounded = false,
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn("skeleton", className)}
      style={{
        width,
        height,
        borderRadius: rounded ? "50%" : undefined,
      }}
    />
  );
}
