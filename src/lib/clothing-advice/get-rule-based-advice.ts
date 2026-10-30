import type { CurrentWeatherDomain } from "@/types/weather";
import {
  weatherCodeToCondition,
  type WeatherCondition,
} from "@/lib/weather/weather-code-to-condition";

const CONDITION_TIPS: Record<WeatherCondition, string | null> = {
  clear: null,
  cloudy: null,
  fog: "Wear something bright, visibility is low.",
  rain: "Take an umbrella.",
  snow: "Wear waterproof boots.",
  storm: "Stay indoors if you can, and keep rain gear handy.",
};

function getClothingByTemperature(temperature: number): string {
  if (temperature >= 28) return "Hot — shorts, t-shirt, stay hydrated.";
  if (temperature >= 20) return "Warm — light clothes, no jacket needed.";
  if (temperature >= 10) return "Cool — sweater or a light jacket.";
  if (temperature >= 0) return "Cold — warm jacket, a hat won't hurt.";
  return "Freezing — full winter gear.";
}

export function getRuleBasedAdvice(weather: CurrentWeatherDomain): string {
  const clothing = getClothingByTemperature(weather.apparentTemperature);
  const tip = CONDITION_TIPS[weatherCodeToCondition(weather.weatherCode)];
  return tip ? `${clothing} ${tip}` : clothing;
}
