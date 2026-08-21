import { Skeleton } from "@/components/skeleton";

export function CurrentWeatherSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton width={150} height={72} />
      <Skeleton width={120} height={16} />
    </div>
  );
}
