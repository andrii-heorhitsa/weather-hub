import type { CurrentWeatherDomain } from "@/types/weather";

export function getRuleBasedAdvice(weather: CurrentWeatherDomain): string {
  const { temperature, weatherCode } = weather;

  if (temperature >= 28) return "Спекотно — шорти, футболка, більше води.";
  if (temperature >= 20) return "Тепло — легкий одяг, можна без куртки.";
  if (temperature >= 10) return "Прохолодно — светр або легка куртка.";
  if (temperature >= 0) return "Холодно — тепла куртка, шапка не завадить.";
  return "Мороз — повний зимовий комплект.";
}
