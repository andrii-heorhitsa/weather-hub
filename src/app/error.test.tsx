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

  it("renders an h2 heading without a main landmark", () => {
    render(<ErrorPage error={new Error("boom")} unstable_retry={vi.fn()} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });

  it("calls unstable_retry when the retry button is clicked", () => {
    const retry = vi.fn();
    render(<ErrorPage error={new Error("boom")} unstable_retry={retry} />);

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(retry).toHaveBeenCalledTimes(1);
  });
});
