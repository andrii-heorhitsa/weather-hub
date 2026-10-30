import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { ErrorFallback } from ".";

const defaultProps = {
  onRetry: vi.fn(),
  title: "Error | Test",
  heading: "Something broke",
  message: "Please try again later.",
  headingLevel: "h2" as const,
  as: "div" as const,
};

describe("ErrorFallback", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the heading, message and retry button", () => {
    render(<ErrorFallback {...defaultProps} error={new Error("boom")} />);

    expect(
      screen.getByRole("heading", { name: "Something broke" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  it.each([
    ["h1", 1],
    ["h2", 2],
  ] as const)("renders the heading as %s", (headingLevel, level) => {
    render(
      <ErrorFallback
        {...defaultProps}
        error={new Error("boom")}
        headingLevel={headingLevel}
      />,
    );

    expect(
      screen.getByRole("heading", { level, name: "Something broke" }),
    ).toBeInTheDocument();
  });

  it("wraps the content in main when as is main", () => {
    render(
      <ErrorFallback {...defaultProps} error={new Error("boom")} as="main" />,
    );

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { name: "Something broke" }),
    );
  });

  it("does not render main when as is div", () => {
    render(<ErrorFallback {...defaultProps} error={new Error("boom")} />);

    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });

  it("sets the document title", () => {
    render(<ErrorFallback {...defaultProps} error={new Error("boom")} />);

    expect(document.title).toBe("Error | Test");
  });

  it("moves focus to the heading after render", () => {
    render(<ErrorFallback {...defaultProps} error={new Error("boom")} />);

    expect(
      screen.getByRole("heading", { name: "Something broke" }),
    ).toHaveFocus();
  });

  it("calls onRetry when the retry button is clicked", () => {
    const retry = vi.fn();
    render(
      <ErrorFallback
        {...defaultProps}
        error={new Error("boom")}
        onRetry={retry}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("logs the error", () => {
    const error = new Error("boom");
    render(<ErrorFallback {...defaultProps} error={error} />);

    expect(console.error).toHaveBeenCalledWith(error);
  });

  it("shows the error digest when present", () => {
    const error = Object.assign(new Error("boom"), { digest: "abc123" });
    render(<ErrorFallback {...defaultProps} error={error} />);

    expect(screen.getByText("Error ID: abc123")).toBeInTheDocument();
  });

  it("does not show an error ID without a digest", () => {
    render(<ErrorFallback {...defaultProps} error={new Error("boom")} />);

    expect(screen.queryByText(/Error ID/)).not.toBeInTheDocument();
  });
});
