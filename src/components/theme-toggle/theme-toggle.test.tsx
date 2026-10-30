import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "./index";

describe("ThemeToggle", () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
    document.cookie = "theme=; path=/; max-age=0";
  });

  it("marks the initial theme as pressed", () => {
    render(<ThemeToggle initialTheme="dark" />);

    expect(screen.getByRole("button", { name: "Dark theme" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "Light theme" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(
      screen.getByRole("button", { name: "System theme" }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("applies the dark theme and saves it to the cookie", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle initialTheme="system" />);

    await user.click(screen.getByRole("button", { name: "Dark theme" }));

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.cookie).toContain("theme=dark");
    expect(screen.getByRole("button", { name: "Dark theme" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("clears the attribute and cookie when switching to system", async () => {
    const user = userEvent.setup();
    document.documentElement.dataset.theme = "light";
    document.cookie = "theme=light; path=/";
    render(<ThemeToggle initialTheme="light" />);

    await user.click(screen.getByRole("button", { name: "System theme" }));

    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(document.cookie).not.toContain("theme=");
  });
});
