import { DEFAULT_CITY } from "@/constants/default-city";
import { CityResult } from "@/types/cities";
import { cookies } from "next/headers";

export async function getCityFromCookie(): Promise<CityResult> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("city")?.value;

  if (!raw) return DEFAULT_CITY;

  try {
    return JSON.parse(decodeURIComponent(raw));
  } catch {
    return DEFAULT_CITY;
  }
}
export { DEFAULT_CITY };
