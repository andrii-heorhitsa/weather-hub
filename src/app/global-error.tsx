"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import "@/styles/globals.css";
import { ErrorMessage } from "@/components/error-message";

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
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <title>Weather Hub — Error</title>
        <div role="alert" className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-light tracking-wide text-ink">
            Weather Hub
          </h1>
          <ErrorMessage
            message="Something went wrong. Please try again."
            onRetry={() => unstable_retry()}
          />
          {error.digest && (
            <p className="text-xs text-ink-muted">Error ID: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
