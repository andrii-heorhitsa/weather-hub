import { getFooterContent } from "@/lib/service/contentful-service";

export async function Footer() {
  const footerContent = await getFooterContent();

  return (
    <footer className="border-t border-hairline bg-paper px-6 py-6 text-center">
      <p className="text-sm text-ink-muted">
        {footerContent?.copyrightText ?? "© 2026 Weather Hub"}
      </p>
      {footerContent?.footerNote && (
        <p className="mt-1 text-xs tracking-wide text-ink-muted uppercase">
          {footerContent.footerNote}
        </p>
      )}
    </footer>
  );
}
