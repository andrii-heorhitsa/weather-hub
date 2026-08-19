import { WeatherInfo } from "@/types/weather";
import { ClothingAdvice } from "../clothing-advice/clothing-advice";
import { weatherCodeToText } from "@/lib/weather/weather-code-to-text";
import { WeatherIcon } from "@/components/weather-icon/weather-icon";
import { formatDate } from "@/lib/format-date";

export default function CurrentWeatherView({
  weatherData,
}: {
  weatherData: WeatherInfo;
}) {
  return (
    <div>
      <div>{weatherData.current.temperature}°C</div>
      <ul>
        {weatherData.daily.map((day) => (
          <li key={day.date}>
            <p>{formatDate(day.date)}</p>
            <p>{weatherCodeToText(day.weatherCode)}</p>
            <WeatherIcon code={day.weatherCode} />
            <p>
              {day.maxTemperature}°C / {day.minTemperature}°C
            </p>
          </li>
        ))}
      </ul>
      <ClothingAdvice weather={weatherData.current} />
    </div>
  );
}
