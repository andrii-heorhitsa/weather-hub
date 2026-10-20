"use client";

import { useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { THEME_COOKIE } from "@/constants/theme";
import type { ThemePreference } from "@/types/theme";

const OPTIONS = [
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
  { value: "system", label: "System theme", Icon: Monitor },
] as const;

function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;

  if (theme === "system") {
    delete root.dataset.theme;
    document.cookie = `${THEME_COOKIE}=; path=/; max-age=0`;
  } else {
    root.dataset.theme = theme;
    document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=31536000`;
  }
}

export function ThemeToggle({
  initialTheme,
}: {
  initialTheme: ThemePreference;
}) {
  const [theme, setTheme] = useState(initialTheme);

  function handleSelect(next: ThemePreference) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="inline-flex items-center gap-1 rounded-full border border-hairline p-1"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            aria-pressed={isActive}
            onClick={() => handleSelect(value)}
            className={`cursor-pointer rounded-full p-1.5 transition-colors hover:text-ink ${
              isActive ? "bg-ink/10 text-ink" : "text-ink-muted"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
