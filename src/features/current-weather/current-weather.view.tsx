import { WeatherInfo } from "@/types/weather";
import { ClothingAdvice } from "../clothing-advice/clothing-advice";

export default function CurrentWeatherView({
  weatherData,
}: {
  weatherData: WeatherInfo;
}) {
  return (
    <div>
      <div>{weatherData.current.temperature}°C</div>
      <ClothingAdvice weather={weatherData.current} />
    </div>
  );
}
