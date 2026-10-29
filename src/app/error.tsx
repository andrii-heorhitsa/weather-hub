"use client"; // Error boundaries must be Client Components

import { useEffect, useRef } from "react";
import { ErrorMessage } from "@/components/error-message";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    console.error(error);
  }, [error]);

  // Move focus to the heading so keyboard and screen reader users land on the error
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-surface px-6 py-20 text-center">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-3xl font-light tracking-wide text-ink focus:outline-none"
      >
        Something went wrong
      </h2>
      <ErrorMessage
        message="We couldn't load this page."
        onRetry={() => unstable_retry()}
      />
      {error.digest && (
        <p className="text-xs text-ink-muted">Error ID: {error.digest}</p>
      )}
    </div>
  );
}
