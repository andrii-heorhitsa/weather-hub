type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message = "Could not load weather",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-danger">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1.5 text-sm underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Try again
        </button>
      )}
    </div>
  );
}
