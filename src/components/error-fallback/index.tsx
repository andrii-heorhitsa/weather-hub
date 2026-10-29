"use client";

import { useEffect, useRef } from "react";
import { ErrorMessage } from "@/components/error-message";

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  onRetry: () => void;
  title: string;
  heading: string;
  message: string;
  headingLevel: "h1" | "h2";
  as: "main" | "div";
};

export function ErrorFallback({
  error,
  onRetry,
  title,
  heading,
  message,
  headingLevel,
  as,
}: ErrorFallbackProps) {
  const Heading = headingLevel;
  const Wrapper = as;
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
      <title>{title}</title>
      <Wrapper className="flex flex-1 flex-col items-center justify-center gap-4 bg-surface px-6 py-20 text-center">
        <Heading
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-3xl font-light tracking-wide text-ink focus:outline-none"
        >
          {heading}
        </Heading>
        <ErrorMessage message={message} onRetry={onRetry} />
        {error.digest && (
          <p className="text-xs text-ink-muted">Error ID: {error.digest}</p>
        )}
      </Wrapper>
    </>
  );
}
