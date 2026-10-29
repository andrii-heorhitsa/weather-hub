"use client"; // Error boundaries must be Client Components

import { ErrorFallback } from "@/components/error-fallback";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <ErrorFallback
      error={error}
      onRetry={() => unstable_retry()}
      title="Error | Weather Hub"
      heading="Something went wrong"
      message="We couldn't load this page."
      headingLevel="h2"
      as="div"
    />
  );
}
