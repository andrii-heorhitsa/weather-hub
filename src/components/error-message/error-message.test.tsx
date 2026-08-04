import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ErrorMessage } from "./index";

describe("ErrorMessage", () => {
  it("renders default message when none is passed", () => {
    render(<ErrorMessage />);

    expect(
      screen.getByText("Не вдалося завантажити погоду"),
    ).toBeInTheDocument();
  });

  it("renders a custom message when passed", () => {
    render(<ErrorMessage message="Custom error text" />);

    expect(screen.getByText("Custom error text")).toBeInTheDocument();
  });

  it("does not render a retry button when onRetry is not passed", () => {
    render(<ErrorMessage />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a retry button when onRetry is passed", () => {
    render(<ErrorMessage onRetry={() => {}} />);

    expect(
      screen.getByRole("button", { name: "Спробувати ще раз" }),
    ).toBeInTheDocument();
  });

  it("calls onRetry when the retry button is clicked", () => {
    const onRetry = vi.fn();
    render(<ErrorMessage onRetry={onRetry} />);

    fireEvent.click(screen.getByRole("button", { name: "Спробувати ще раз" }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
