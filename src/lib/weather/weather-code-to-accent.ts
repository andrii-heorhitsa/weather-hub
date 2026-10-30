// CSS variables defined per theme in globals.css
const SUN = "var(--accent-sun)";
const CLOUD = "var(--accent-cloud)";
const OVERCAST = "var(--accent-overcast)";
const FOG = "var(--accent-fog)";
const DRIZZLE = "var(--accent-drizzle)";
const RAIN = "var(--accent-rain)";
const SNOW = "var(--accent-snow)";
const STORM = "var(--accent-storm)";

const ACCENT_MAP: Record<number, string> = {
  0: SUN,
  1: SUN,
  2: CLOUD,
  3: OVERCAST,
  45: FOG,
  48: FOG,
  51: DRIZZLE,
  53: DRIZZLE,
  55: DRIZZLE,
  56: DRIZZLE,
  57: DRIZZLE,
  61: RAIN,
  63: RAIN,
  65: RAIN,
  66: RAIN,
  67: RAIN,
  71: SNOW,
  73: SNOW,
  75: SNOW,
  77: SNOW,
  80: RAIN,
  81: RAIN,
  82: RAIN,
  85: SNOW,
  86: SNOW,
  95: STORM,
  96: STORM,
  99: STORM,
};

export function weatherCodeToAccent(code: number): string {
  return ACCENT_MAP[code] ?? OVERCAST;
}
