"use client"; // Error boundaries must be Client Components

import "@/styles/globals.css";
import { ErrorFallback } from "@/components/error-fallback";

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
      <body className="flex min-h-screen flex-col">
        <ErrorFallback
          error={error}
          onRetry={() => unstable_retry()}
          title="Weather Hub — Error"
          heading="Weather Hub is temporarily unavailable"
          message="Something went wrong. Please try again."
          headingLevel="h1"
          as="main"
        />
      </body>
    </html>
  );
}
