import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CurrentWeather } from "./index";
import { useWeather } from "@/hooks/use-weather";
import type { WeatherInfo } from "@/types/weather";

vi.mock("@/features/clothing-advice/clothing-advice", () => ({
  ClothingAdvice: () => null,
}));

vi.mock("@/hooks/use-weather");

const mockUseWeather = vi.mocked(useWeather);

const mockWeatherData: WeatherInfo = {
  latitude: 48.2921,
  longitude: 25.9352,
  timezone: "Europe/Kyiv",
  current: {
    time: "2026-08-03T12:00",
    temperature: 21,
    humidity: 44,
    apparentTemperature: 19,
    isDay: true,
    precipitation: 0,
    weatherCode: 2,
    windSpeed: 15,
    windDirection: 288,
  },
  daily: [
    {
      date: "2026-08-03",
      weatherCode: 2,
      maxTemperature: 24,
      minTemperature: 14,
      precipitationSum: 0,
    },
  ],
};

function mockWeatherResult(overrides: Partial<ReturnType<typeof useWeather>>) {
  return {
    data: undefined,
    isPending: false,
    isError: false,
    refetch: vi.fn(),
    ...overrides,
  } as unknown as ReturnType<typeof useWeather>;
}

describe("CurrentWeather", () => {
  beforeEach(() => {
    mockUseWeather.mockReset();
  });

  it("renders skeleton while pending", () => {
    mockUseWeather.mockReturnValue(mockWeatherResult({ isPending: true }));

    const { container } = render(
      <CurrentWeather latitude={48.29} longitude={25.94} />,
    );

    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders error message when isError", () => {
    mockUseWeather.mockReturnValue(mockWeatherResult({ isError: true }));

    render(<CurrentWeather latitude={48.29} longitude={25.94} />);

    expect(screen.getByText("Could not load weather")).toBeInTheDocument();
  });

  it("calls refetch when retry is clicked after an error", () => {
    const refetch = vi.fn();
    mockUseWeather.mockReturnValue(
      mockWeatherResult({ isError: true, refetch }),
    );

    render(<CurrentWeather latitude={48.29} longitude={25.94} />);
    screen.getByRole("button", { name: "Try again" }).click();

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it("renders weather data when loaded", () => {
    mockUseWeather.mockReturnValue(
      mockWeatherResult({ data: mockWeatherData }),
    );

    render(<CurrentWeather latitude={48.29} longitude={25.94} />);

    expect(screen.getByText("21°C")).toBeInTheDocument();
  });
});
