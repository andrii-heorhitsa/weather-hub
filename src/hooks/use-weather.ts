import { fetchWeather } from "@/lib/weather-client";
import { useQuery } from "@tanstack/react-query";

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
    staleTime: 5 * 60 * 1000,
  });
}
