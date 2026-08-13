import type { CityResult } from "@/types/cities";

type FetchReverseGeocodeParams = {
  latitude: number;
  longitude: number;
};

export async function fetchReverseGeocode({
  latitude,
  longitude,
}: FetchReverseGeocodeParams): Promise<CityResult> {
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
  });

  const response = await fetch(`/api/reverse-geocode?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to reverse geocode: ${response.status}`);
  }

  return response.json();
}
