"use client";

import { useEffect, useRef } from "react";
import { ErrorMessage } from "@/components/error-message";

type GlobalErrorContentProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
};

export function GlobalErrorContent({ error, onRetry }: GlobalErrorContentProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Move focus to the heading so keyboard and screen reader users land on the error
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <>
      <title>Weather Hub — Error</title>
      <main className="flex flex-col items-center gap-4">
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-3xl font-light tracking-wide text-ink focus:outline-none"
        >
          Weather Hub is temporarily unavailable
        </h1>
        <ErrorMessage
          message="Something went wrong. Please try again."
          onRetry={onRetry}
        />
        {error.digest && (
          <p className="text-xs text-ink-muted">Error ID: {error.digest}</p>
        )}
      </main>
    </>
  );
}
