import type { CurrentWeatherDomain } from "@/types/weather";

export function getRuleBasedAdvice(weather: CurrentWeatherDomain): string {
  const { temperature, weatherCode } = weather;

  if (temperature >= 28) return "Hot — shorts, t-shirt, stay hydrated.";
  if (temperature >= 20) return "Warm — light clothes, no jacket needed.";
  if (temperature >= 10) return "Cool — sweater or a light jacket.";
  if (temperature >= 0) return "Cold — warm jacket, a hat won't hurt.";
  return "Freezing — full winter gear.";
}
