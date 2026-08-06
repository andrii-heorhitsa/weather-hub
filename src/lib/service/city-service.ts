import { CityDto, CityResult } from "@/types/cities";

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export function mapCityDtoToDomain(dto: CityDto) {
  return {
    id: dto.id,
    name: dto.name,
    country: dto.country,
    admin1: dto.admin1,
    latitude: dto.latitude,
    longitude: dto.longitude,
  };
}

export async function searchCities(name: string): Promise<CityResult[]> {
  const params = new URLSearchParams({
    name,
    count: "10",
    language: "uk",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch cities: ${response.status}`);
  }

  const rawData: { results?: CityDto[] } = await response.json();
  const rawCities: CityDto[] = rawData.results ?? [];

  return rawCities.map(mapCityDtoToDomain);
}
