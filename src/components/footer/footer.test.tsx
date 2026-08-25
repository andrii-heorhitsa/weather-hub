import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "./index";
import { getFooterContent } from "@/lib/service/contentful-service";

vi.mock("@/lib/service/contentful-service", () => ({
  getFooterContent: vi.fn(),
}));

describe("Footer", () => {
  it("renders copyright text and footer note from Contentful", async () => {
    vi.mocked(getFooterContent).mockResolvedValue({
      copyrightText: "© 2026 My Weather",
      footerNote: "Powered by Open-Meteo",
    });

    render(await Footer());

    expect(screen.getByText("© 2026 My Weather")).toBeInTheDocument();
    expect(screen.getByText("Powered by Open-Meteo")).toBeInTheDocument();
  });

  it("falls back to default copyright when Contentful returns null", async () => {
    vi.mocked(getFooterContent).mockResolvedValue(null);

    render(await Footer());

    expect(screen.getByText("© 2026 Weather Hub")).toBeInTheDocument();
  });

  it("does not render footer note when it's absent", async () => {
    vi.mocked(getFooterContent).mockResolvedValue({
      copyrightText: "© X",
    });

    render(await Footer());

    expect(screen.getByText("© X").nextSibling).toBeNull();
  });
});
