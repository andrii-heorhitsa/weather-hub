type ErrorMessageProps = {
  message?: string;
  onRetry?: () => void;
};

export function ErrorMessage({
  message = "Could not load weather",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-red-600 dark:text-red-400">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm underline">
          Try again
        </button>
      )}
    </div>
  );
}
