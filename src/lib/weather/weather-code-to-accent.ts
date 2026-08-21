const ACCENT_MAP: Record<number, string> = {
  0: "#C98A2B",
  1: "#C98A2B",
  2: "#8A8F7D",
  3: "#6B6F76",
  45: "#8A9096",
  48: "#8A9096",
  51: "#3E7A8C",
  53: "#3E7A8C",
  55: "#3E7A8C",
  56: "#3E7A8C",
  57: "#3E7A8C",
  61: "#2F6B7A",
  63: "#2F6B7A",
  65: "#2F6B7A",
  66: "#2F6B7A",
  67: "#2F6B7A",
  71: "#7C93A8",
  73: "#7C93A8",
  75: "#7C93A8",
  77: "#7C93A8",
  80: "#2F6B7A",
  81: "#2F6B7A",
  82: "#2F6B7A",
  85: "#7C93A8",
  86: "#7C93A8",
  95: "#4B3F72",
  96: "#4B3F72",
  99: "#4B3F72",
};

export function weatherCodeToAccent(code: number): string {
  return ACCENT_MAP[code] ?? "#6B6F76";
}
