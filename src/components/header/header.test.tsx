import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./index";
import { getHeaderContent } from "@/lib/service/contentful-service";

vi.mock("@/lib/service/contentful-service", () => ({
  getHeaderContent: vi.fn(),
}));

describe("Header", () => {
  it("renders title and tagline from Contentful", async () => {
    vi.mocked(getHeaderContent).mockResolvedValue({
      siteTitle: "My Weather",
      tagline: "Daily forecast",
    });

    render(await Header());

    expect(
      screen.getByRole("heading", { name: "My Weather" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Daily forecast")).toBeInTheDocument();
  });

  it("falls back to default title when Contentful returns null", async () => {
    vi.mocked(getHeaderContent).mockResolvedValue(null);

    render(await Header());

    expect(
      screen.getByRole("heading", { name: "Weather Hub" }),
    ).toBeInTheDocument();
  });

  it("does not render tagline when it's absent", async () => {
    vi.mocked(getHeaderContent).mockResolvedValue({ siteTitle: "X" });

    render(await Header());

    expect(screen.queryByRole("heading", { level: 4 })).not.toBeInTheDocument();
  });
});
