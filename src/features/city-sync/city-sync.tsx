"use client";

import { useEffect } from "react";
import { useCityStore } from "@/providers/city-store-provider";

export function CitySync() {
  const selectedCity = useCityStore((store) => store.selectedCity);

  useEffect(() => {
    document.cookie = `city=${encodeURIComponent(JSON.stringify(selectedCity))}; path=/; max-age=31536000`;
  }, [selectedCity]);

  return null;
}
