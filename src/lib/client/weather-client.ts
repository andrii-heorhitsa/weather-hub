import { WeatherInfo } from "@/types/weather";

type FetchWeatherParams = {
  latitude: number;
  longitude: number;
};

export async function fetchWeather({
  latitude,
  longitude,
}: FetchWeatherParams): Promise<WeatherInfo> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
  });

  const response = await fetch(`/api/weather/?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}
