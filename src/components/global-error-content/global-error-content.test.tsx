import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { GlobalErrorContent } from ".";

describe("GlobalErrorContent", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a heading and a retry button inside main", () => {
    render(<GlobalErrorContent error={new Error("boom")} onRetry={vi.fn()} />);

    const main = screen.getByRole("main");
    expect(main).toContainElement(
      screen.getByRole("heading", {
        level: 1,
        name: "Weather Hub is temporarily unavailable",
      }),
    );
    expect(main).toContainElement(
      screen.getByRole("button", { name: "Try again" }),
    );
  });

  it("moves focus to the heading after render", () => {
    render(<GlobalErrorContent error={new Error("boom")} onRetry={vi.fn()} />);

    expect(
      screen.getByRole("heading", {
        name: "Weather Hub is temporarily unavailable",
      }),
    ).toHaveFocus();
  });

  it("calls onRetry when the retry button is clicked", () => {
    const retry = vi.fn();
    render(<GlobalErrorContent error={new Error("boom")} onRetry={retry} />);

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("logs the error", () => {
    const error = new Error("boom");
    render(<GlobalErrorContent error={error} onRetry={vi.fn()} />);

    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("shows the error digest when present", () => {
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    render(<GlobalErrorContent error={error} onRetry={vi.fn()} />);

    expect(screen.getByText("Error ID: abc123")).toBeInTheDocument();
  });

  it("does not show an error ID without a digest", () => {
    render(<GlobalErrorContent error={new Error("boom")} onRetry={vi.fn()} />);

    expect(screen.queryByText(/Error ID/)).not.toBeInTheDocument();
  });
});
