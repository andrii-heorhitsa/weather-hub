import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import ErrorPage from "./error";

describe("ErrorPage", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a heading and a retry button", () => {
    render(<ErrorPage error={new Error("boom")} unstable_retry={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  it("moves focus to the heading after render", () => {
    render(<ErrorPage error={new Error("boom")} unstable_retry={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toHaveFocus();
  });

  it("calls unstable_retry when the retry button is clicked", () => {
    const retry = vi.fn();
    render(<ErrorPage error={new Error("boom")} unstable_retry={retry} />);

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("logs the error", () => {
    const error = new Error("boom");
    render(<ErrorPage error={error} unstable_retry={vi.fn()} />);

    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("shows the error digest when present", () => {
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    render(<ErrorPage error={error} unstable_retry={vi.fn()} />);

    expect(screen.getByText("Error ID: abc123")).toBeInTheDocument();
  });

  it("does not show an error ID without a digest", () => {
    render(<ErrorPage error={new Error("boom")} unstable_retry={vi.fn()} />);

    expect(screen.queryByText(/Error ID/)).not.toBeInTheDocument();
  });
});
