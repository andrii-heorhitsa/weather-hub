"use client";

import { useWeather } from "@/hooks/use-weather";
import CurrentWeatherView from "./current-weather.view";
import { CurrentWeatherSkeleton } from "./current-weather-skeleton.view";
import { ErrorMessage } from "@/components/error-message";

export function CurrentWeather({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const { data, isPending, isError, isFetching, refetch } = useWeather(
    latitude,
    longitude,
  );

  if (isPending) {
    return <CurrentWeatherSkeleton />;
  }

  if (isError) {
    return <ErrorMessage onRetry={() => refetch()} />;
  }

  return (
    <div
      className={
        isFetching ? "opacity-60 transition-opacity" : "transition-opacity"
      }
    >
      <CurrentWeatherView weatherData={data} />
    </div>
  );
}
