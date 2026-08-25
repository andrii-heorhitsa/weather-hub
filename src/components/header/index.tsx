import { getHeaderContent } from "@/lib/service/contentful-service";

export async function Header() {
  const headerContent = await getHeaderContent();

  return (
    <header className="border-b border-hairline bg-paper px-6 py-5 text-center">
      <h1 className="font-display text-3xl font-light tracking-wide text-ink">
        {headerContent?.siteTitle ?? "Weather Hub"}
      </h1>
      {headerContent?.tagline && (
        <h4 className="mt-1 text-sm tracking-wide text-ink-muted uppercase">
          {headerContent.tagline}
        </h4>
      )}
    </header>
  );
}
