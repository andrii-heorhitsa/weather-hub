"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WeatherInfo } from "@/types/weather";
import { ClothingAdvice } from "../clothing-advice/clothing-advice";
import { weatherCodeToText } from "@/lib/weather/weather-code-to-text";
import { weatherCodeToAccent } from "@/lib/weather/weather-code-to-accent";
import { WeatherIcon } from "@/components/weather-icon/weather-icon";
import { formatDate } from "@/lib/format-date";
import { useCityStore } from "@/providers/city-store-provider";

gsap.registerPlugin(useGSAP);

export default function CurrentWeatherView({
  weatherData,
}: {
  weatherData: WeatherInfo;
}) {
  const cityId = useCityStore((store) => store.selectedCity.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const accent = weatherCodeToAccent(weatherData.current.weatherCode);
  const tempRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const targetTemp = weatherData.current.temperature;
      const tempObj = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.6 },
      });

      tl.from(".js-hero", {
        opacity: 0,
        y: 16,
        scale: 0.98,
      })
        .to(
          tempObj,
          {
            value: targetTemp,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              if (tempRef.current) {
                tempRef.current.textContent = `${Math.round(tempObj.value)}°`;
              }
            },
          },
          "<",
        )
        .from(
          ".js-forecast-item",
          {
            opacity: 0,
            y: 10,
            stagger: 0.05,
          },
          "-=0.3",
        )
        .from(
          ".js-clothing",
          {
            opacity: 0,
            y: 12,
          },
          "-=0.2",
        );
    },
    { scope: containerRef, dependencies: [cityId] },
  );

  return (
    <div ref={containerRef} className="mt-8 flex flex-col items-center gap-10">
      {/* Hero Temperature Block */}
      <div className="js-hero flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span
            ref={tempRef}
            className="font-display text-7xl font-light leading-none"
            style={{ color: accent }}
          >
            0°
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
      </div>

      {/* Daily Forecast List */}
      <ul className="w-full divide-y divide-hairline border-t border-b border-hairline">
        {weatherData.daily.map((day) => (
          <li
            key={day.date}
            className="js-forecast-item flex items-center justify-between gap-4 py-3"
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
              {day.maxTemperature}°{" "}
              <span className="text-ink-muted">/ {day.minTemperature}°</span>
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
