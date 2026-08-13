import { CityResult } from "@/types/cities";

type FetchCityParams = {
  name: string;
};

export async function fetchCity({
  name,
}: FetchCityParams): Promise<CityResult[]> {
  const params = new URLSearchParams({ name });

  const response = await fetch(`/api/cities?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch city data");
  }

  return response.json();
}
