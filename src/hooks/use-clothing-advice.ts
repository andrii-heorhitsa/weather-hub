import { useQuery } from "@tanstack/react-query";
import { fetchClothingAdvice } from "@/lib/client/clothing-advice-client";
import type { CurrentWeatherDomain } from "@/types/weather";

export function useClothingAdvice(weather: CurrentWeatherDomain) {
  return useQuery({
    queryKey: ["clothing-advice", weather.temperature, weather.weatherCode],
    queryFn: () => fetchClothingAdvice(weather),
    retry: false,
    staleTime: 60 * 60 * 1000,
  });
}
