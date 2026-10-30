import { THEME_COOKIE } from "@/constants/theme";
import type { ThemePreference } from "@/types/theme";
import { cookies } from "next/headers";

export async function getThemeFromCookie(): Promise<ThemePreference> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(THEME_COOKIE)?.value;

  return raw === "light" || raw === "dark" ? raw : "system";
}
