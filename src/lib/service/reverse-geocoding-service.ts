import type { CityResult } from "@/types/cities";

const BASE_URL = "https://nominatim.openstreetmap.org/reverse";

type NominatimDto = {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    country?: string;
  };
};

function mapNominatimDtoToDomain(
  dto: NominatimDto,
  latitude: number,
  longitude: number,
): CityResult {
  const address = dto.address ?? {};
  const name =
    address.city ??
    address.town ??
    address.village ??
    address.municipality ??
    "Unknown";

  return {
    id: Date.now(),
    name,
    country: address.country ?? "",
    latitude,
    longitude,
  };
}

export async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<CityResult> {
  const params = new URLSearchParams({
    lat: latitude.toString(),
    lon: longitude.toString(),
    format: "json",
    addressdetails: "1",
    "accept-language": "en",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    headers: {
      "User-Agent": "weather-hub (learning project)",
    },
  });

  if (!response.ok) {
    throw new Error(`Reverse geocoding failed: ${response.status}`);
  }

  const dto: NominatimDto = await response.json();
  return mapNominatimDtoToDomain(dto, latitude, longitude);
}
