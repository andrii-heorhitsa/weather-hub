export type CurrentWeather = {
  time: string;
  temperature: number;
  humidity: number;
  apparentTemperature: number;
  isDay: boolean;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
};

export type DailyWeatherItem = {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  precipitationSum: number;
};

export type WeatherInfo = {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  daily: DailyWeatherItem[];
};
