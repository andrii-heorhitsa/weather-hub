import type { CurrentWeatherDomain } from "@/types/weather";

export async function fetchClothingAdvice(
  weather: CurrentWeatherDomain,
): Promise<string> {
  const response = await fetch("/api/clothing-advice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(weather),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch clothing advice: ${response.status}`);
  }

  const data = await response.json();
  return data.advice;
}
