"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WeatherInfo } from "@/types/weather";
import { ClothingAdvice } from "../clothing-advice/clothing-advice";
import { weatherCodeToText } from "@/lib/weather/weather-code-to-text";
import { weatherCodeToAccent } from "@/lib/weather/weather-code-to-accent";
import { WeatherIcon } from "@/components/weather-icon/weather-icon";
import { formatDate } from "@/lib/format-date";
import { Droplets, Wind } from "lucide-react";
import { useUnitStore } from "@/store/unit-store";
import { formatTemperature } from "@/lib/weather/convert-temperature";
import { UnitToggle } from "@/components/unit-toggle";

gsap.registerPlugin(useGSAP);

export default function CurrentWeatherView({
  weatherData,
}: {
  weatherData: WeatherInfo;
}) {
  const unit = useUnitStore((s) => s.unit);
  const containerRef = useRef<HTMLDivElement>(null);
  const accent = weatherCodeToAccent(weatherData.current.weatherCode);

  const [displayTempCelsius, setDisplayTempCelsius] = useState(
    weatherData.current.temperature,
  );
  const displayTempRef = useRef(displayTempCelsius);
  const isFirstRun = useRef(true);
  const displayTemp = formatTemperature(displayTempCelsius, unit);

  useGSAP(
    () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }

      const targetTemp = weatherData.current.temperature;
      const tempObj = { value: displayTempRef.current };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.6 },
      });

      tl.from(".js-hero", { opacity: 0, y: 16, scale: 0.98 })
        .to(
          tempObj,
          {
            value: targetTemp,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              const rounded = Math.round(tempObj.value);
              setDisplayTempCelsius(rounded);
              displayTempRef.current = rounded;
            },
          },
          "<",
        )
        .from(".js-details", { opacity: 0, y: 10 }, "-=0.4")
        .from(
          ".js-forecast-item",
          { opacity: 0, y: 10, stagger: 0.05 },
          "-=0.3",
        )
        .from(".js-clothing", { opacity: 0, y: 12 }, "-=0.2");
    },
    {
      scope: containerRef,
      dependencies: [
        weatherData.current.temperature,
        weatherData.current.weatherCode,
      ],
    },
  );

  return (
    <div ref={containerRef} className="mt-8 flex flex-col items-center gap-10">
      {/* Hero Temperature Block */}
      <div className="js-hero flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span
            className="font-display text-7xl font-light leading-none"
            style={{ color: accent }}
          >
            {displayTemp}°{unit}
          </span>
          <WeatherIcon
            code={weatherData.current.weatherCode}
            className="h-14 w-14 shrink-0"
            style={{
              color: weatherCodeToAccent(weatherData.current.weatherCode),
            }}
          />
        </div>
        <p className="mt-2 text-sm tracking-wide text-ink-muted uppercase">
          {weatherCodeToText(weatherData.current.weatherCode)}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Feels like{" "}
          {formatTemperature(weatherData.current.apparentTemperature, unit)}°
          {unit}
        </p>
      </div>

      {/* Humidity / Wind Details */}
      <div className="js-details flex w-full items-center justify-center gap-8 border-t py-4">
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Droplets className="h-4 w-4" aria-hidden="true" />
          <span>{weatherData.current.humidity}% humidity</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-muted">
          <Wind className="h-4 w-4" aria-hidden="true" />
          <span>{weatherData.current.windSpeed} km/h</span>
        </div>
        <UnitToggle />
      </div>

      {/* Daily Forecast List */}
      <ul className="w-full divide-y divide-hairline">
        {weatherData.daily.map((day, index) => (
          <li
            key={day.date}
            className={`js-forecast-item flex items-center justify-between gap-4 py-3 ${
              index === 0 ? "border-t border-hairline" : ""
            } ${index === weatherData.daily.length - 1 ? "border-b border-hairline" : ""}`}
          >
            <span className="w-20 text-sm text-ink-muted">
              {formatDate(day.date)}
            </span>

            <WeatherIcon
              code={day.weatherCode}
              className="h-5 w-5 shrink-0"
              style={{ color: weatherCodeToAccent(day.weatherCode) }}
            />

            <span className="flex-1 truncate text-sm text-ink-muted">
              {weatherCodeToText(day.weatherCode)}
            </span>

            <span className="text-sm text-ink">
              {formatTemperature(day.maxTemperature, unit)}°{" "}
              <span className="text-ink-muted">
                / {formatTemperature(day.minTemperature, unit)}°
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* Clothing Advice */}
      <div className="js-clothing w-full">
        <ClothingAdvice weather={weatherData.current} />
      </div>
    </div>
  );
}
