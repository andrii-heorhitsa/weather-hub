import { getHeaderContent } from "@/lib/service/contentful-service";
import type { ThemePreference } from "@/types/theme";
import { ThemeToggle } from "../theme-toggle";

export async function Header({
  theme = "system",
}: {
  theme?: ThemePreference;
} = {}) {
  const headerContent = await getHeaderContent();

  return (
    <header className="relative border-b border-hairline bg-paper px-6 py-5 text-center">
      <h1 className="font-display text-3xl font-light tracking-wide text-ink">
        {headerContent?.siteTitle ?? "Weather Hub"}
      </h1>
      {headerContent?.tagline && (
        <p className="mt-1 text-sm tracking-wide text-ink-muted uppercase">
          {headerContent.tagline}
        </p>
      )}
      <div className="mt-3 sm:absolute sm:top-5 sm:right-6 sm:mt-0">
        <ThemeToggle initialTheme={theme} />
      </div>
    </header>
  );
}
