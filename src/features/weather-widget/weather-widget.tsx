"use client";

import { CurrentWeather } from "@/features/current-weather";
import { CitySearch } from "../city-search";
import { useCityStore } from "@/providers/city-store-provider";
import { CitySync } from "../city-sync/city-sync";
import { GeolocationSync } from "../geolocation-sync/geolocation-sync";

export function WeatherWidget() {
  const selectedCity = useCityStore((store) => store.selectedCity);
  const setSelectedCity = useCityStore((store) => store.setSelectedCity);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <CitySync />
      <GeolocationSync />
      <CitySearch onSelect={setSelectedCity} />

      <div className="w-full text-center">
        <h1 className="font-display text-3xl font-light tracking-wide text-ink">
          {selectedCity.name}
          <span className="text-ink-muted">, {selectedCity.country}</span>
        </h1>

        <CurrentWeather
          latitude={selectedCity.latitude}
          longitude={selectedCity.longitude}
        />
      </div>
    </div>
  );
}
