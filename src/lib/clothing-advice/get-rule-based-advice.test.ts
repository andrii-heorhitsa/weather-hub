import { describe, it, expect } from "vitest";
import type { CurrentWeatherDomain } from "@/types/weather";
import { getRuleBasedAdvice } from "./get-rule-based-advice";

const baseWeather: CurrentWeatherDomain = {
  temperature: 15,
  apparentTemperature: 15,
  weatherCode: 0,
  windSpeed: 10,
  precipitation: 0,
};

describe("getRuleBasedAdvice", () => {
  it.each([
    [10, 61, "Cool — sweater or a light jacket. Take an umbrella."],
    [25, 0, "Warm — light clothes, no jacket needed."],
    [15, 3, "Cool — sweater or a light jacket."],
    [-5, 71, "Freezing — full winter gear. Wear waterproof boots."],
    [
      5,
      45,
      "Cold — warm jacket, a hat won't hurt. Wear something bright, visibility is low.",
    ],
    [
      22,
      95,
      "Warm — light clothes, no jacket needed. Stay indoors if you can, and keep rain gear handy.",
    ],
  ])(
    "for feels-like %i and code %i returns %s",
    (apparentTemperature, weatherCode, expected) => {
      expect(
        getRuleBasedAdvice({
          ...baseWeather,
          apparentTemperature,
          weatherCode,
        }),
      ).toBe(expected);
    },
  );

  it("uses the apparent temperature, not the actual one", () => {
    expect(
      getRuleBasedAdvice({
        ...baseWeather,
        temperature: 12,
        apparentTemperature: 8,
      }),
    ).toBe("Cold — warm jacket, a hat won't hurt.");
  });

  it.each([
    [28, "Hot"],
    [20, "Warm"],
    [10, "Cool"],
    [0, "Cold"],
    [-1, "Freezing"],
  ])("at the %i threshold starts with %s", (apparentTemperature, level) => {
    expect(getRuleBasedAdvice({ ...baseWeather, apparentTemperature })).toMatch(
      new RegExp(`^${level} —`),
    );
  });
});
