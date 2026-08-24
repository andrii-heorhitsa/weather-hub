import { fetchWeather } from "@/lib/client/weather-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useWeather(latitude?: number, longitude?: number) {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => {
      if (latitude === undefined || longitude === undefined) {
        throw new Error("useWeather called without valid coordinates");
      }
      return fetchWeather({ latitude, longitude });
    },
    enabled: latitude !== undefined && longitude !== undefined,
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
