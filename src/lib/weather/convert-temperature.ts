import { TemperatureUnit } from "@/store/unit-store";

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit,
): number {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}
