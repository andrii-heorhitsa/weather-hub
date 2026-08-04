import { WeatherInfo } from "@/types/weather";

export default function CurrentWeatherView({
  weatherData,
}: {
  weatherData: WeatherInfo;
}) {
  return <div>{weatherData.current.temperature}°C</div>;
}
