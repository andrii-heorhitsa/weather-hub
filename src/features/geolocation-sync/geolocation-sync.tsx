"use client";

import { useEffect } from "react";
import { useCityStore } from "@/providers/city-store-provider";
import { DEFAULT_CITY } from "@/constants/default-city";
import { fetchReverseGeocode } from "@/lib/client/reverse-geocode-client";

export function GeolocationSync() {
  const selectedCity = useCityStore((store) => store.selectedCity);
  const setSelectedCity = useCityStore((store) => store.setSelectedCity);

  useEffect(() => {
    if (selectedCity.id !== DEFAULT_CITY.id) return;

    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        try {
          const city = await fetchReverseGeocode({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setSelectedCity(city);
        } catch {}
      },
      () => {},
    );
  }, []);

  return null;
}
