import { WeatherInfo } from "@/types/weather";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const CURRENT_PARAMS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "precipitation",
  "weather_code",
  "wind_speed_10m",
  "wind_direction_10m",
].join(",");

const DAILY_PARAMS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "precipitation_sum",
].join(",");

type WeatherDto = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: 0 | 1;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
};

export function mapWeatherDtoToDomain(dto: WeatherDto): WeatherInfo {
  return {
    latitude: dto.latitude,
    longitude: dto.longitude,
    timezone: dto.timezone,
    current: {
      time: dto.current.time,
      temperature: Math.round(dto.current.temperature_2m),
      humidity: dto.current.relative_humidity_2m,
      apparentTemperature: Math.round(dto.current.apparent_temperature),
      isDay: dto.current.is_day === 1,
      precipitation: dto.current.precipitation,
      weatherCode: dto.current.weather_code,
      windSpeed: dto.current.wind_speed_10m,
      windDirection: dto.current.wind_direction_10m,
    },

    daily: dto.daily.time.map((date, index) => ({
      date,
      weatherCode: dto.daily.weather_code[index],
      maxTemperature: Math.round(dto.daily.temperature_2m_max[index]),
      minTemperature: Math.round(dto.daily.temperature_2m_min[index]),
      precipitationSum: dto.daily.precipitation_sum[index],
    })),
  };
}

export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherInfo> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: CURRENT_PARAMS,
    daily: DAILY_PARAMS,
    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }

  const rawWeather: WeatherDto = await response.json();

  return mapWeatherDtoToDomain(rawWeather);
}
