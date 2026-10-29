import { describe, it, expect } from "vitest";
import {
  weatherCodeToCondition,
  type WeatherCondition,
} from "./weather-code-to-condition";

const CODES_BY_CONDITION: Record<WeatherCondition, number[]> = {
  clear: [0, 1],
  cloudy: [2, 3],
  fog: [45, 48],
  rain: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
  storm: [95, 96, 99],
};

describe("weatherCodeToCondition", () => {
  describe.each(Object.entries(CODES_BY_CONDITION))("%s", (condition, codes) => {
    it.each(codes)(`maps code %i to ${condition}`, (code) => {
      expect(weatherCodeToCondition(code)).toBe(condition);
    });
  });

  it.each([4, 44, 100, -1])("falls back to cloudy for unknown code %i", (code) => {
    expect(weatherCodeToCondition(code)).toBe("cloudy");
  });
});
