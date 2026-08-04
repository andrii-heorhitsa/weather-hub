type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
};

export function Skeleton({
  width = "100%",
  height = "16px",
  circle,
  className = "",
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  return (
    <div
      style={style}
      className={`animate-pulse bg-zinc-200 dark:bg-zinc-800 ${circle ? "rounded-full" : "rounded-md"} ${className}`}
    />
  );
}
