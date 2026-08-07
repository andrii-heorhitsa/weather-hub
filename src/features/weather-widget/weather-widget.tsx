"use client";

import { useState } from "react";
import { CurrentWeather } from "@/features/current-weather";
import { CitySearch } from "../city-search";
import { CityResult } from "@/types/cities";

const DEFAULT_CITY: CityResult = {
  id: 1,
  name: "Chernivtsi",
  country: "Ukraine",
  latitude: 48.29,
  longitude: 25.94,
};

export function WeatherWidget() {
  const [selectedCity, setSelectedCity] = useState<CityResult>(DEFAULT_CITY);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <CitySearch onSelect={(city) => setSelectedCity(city)} />

      <div className="w-full text-center">
        <h1 className="mb-4 text-xl font-bold">
          {selectedCity.name}, {selectedCity.country}
        </h1>

        <CurrentWeather
          latitude={selectedCity.latitude}
          longitude={selectedCity.longitude}
        />
      </div>
    </div>
  );
}
