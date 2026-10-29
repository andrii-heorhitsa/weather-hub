"use client"; // Error boundaries must be Client Components

import "@/styles/globals.css";
import { GlobalErrorContent } from "@/components/global-error-content";

// Replaces the root layout when it fails, so it renders its own document.
// The theme cookie and next/font from layout.tsx are not available here:
// the page follows the OS color scheme and uses the system font.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <GlobalErrorContent error={error} onRetry={() => unstable_retry()} />
      </body>
    </html>
  );
}
