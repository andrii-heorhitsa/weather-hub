// features/city-search/city-search.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CitySearch } from "./index";
import { useCitiesSearch } from "@/hooks/use-city-search";
import type { CityResult } from "@/types/cities";

vi.mock("@/hooks/use-city-search");
vi.mock("@/hooks/use-debounce", () => ({
  useDebounce: (value: string) => value,
}));

const mockedUseCitiesSearch = vi.mocked(useCitiesSearch);

function mockCitiesResult(
  overrides: Partial<ReturnType<typeof useCitiesSearch>> = {},
) {
  mockedUseCitiesSearch.mockReturnValue({
    data: [],
    isPending: false,
    ...overrides,
  } as ReturnType<typeof useCitiesSearch>);
}

const kyiv: CityResult = {
  id: 1,
  name: "Kyiv",
  country: "Ukraine",
  admin1: "Kyiv City",
  latitude: 50.45,
  longitude: 30.52,
};

describe("CitySearch", () => {
  beforeEach(() => {
    mockCitiesResult();
  });

  it("renders the input", () => {
    render(<CitySearch onSelect={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("Search for a city…"),
    ).toBeInTheDocument();
  });

  it("shows loading state while pending", () => {
    mockCitiesResult({ isPending: true });
    render(<CitySearch onSelect={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Search for a city…"), {
      target: { value: "Kyi" },
    });

    expect(screen.getByText("Searching…")).toBeInTheDocument();
  });

  it("shows results returned by the hook", () => {
    mockCitiesResult({ data: [kyiv] });
    render(<CitySearch onSelect={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Search for a city…"), {
      target: { value: "Kyi" },
    });

    expect(screen.getByRole("button", { name: /kyiv/i })).toBeInTheDocument();
  });

  it('shows "Nothing found" when there are no results', () => {
    mockCitiesResult({ data: [] });
    render(<CitySearch onSelect={vi.fn()} />);

    fireEvent.change(screen.getByPlaceholderText("Search for a city…"), {
      target: { value: "Kyi" },
    });

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("calls onSelect and closes the dropdown when a city is picked", () => {
    mockCitiesResult({ data: [kyiv] });
    const onSelect = vi.fn();
    render(<CitySearch onSelect={onSelect} />);

    const input = screen.getByPlaceholderText("Search for a city…");
    fireEvent.change(input, { target: { value: "Kyi" } });

    fireEvent.mouseDown(screen.getByRole("button", { name: /kyiv/i }));

    expect(onSelect).toHaveBeenCalledWith(kyiv);
    expect(input).toHaveValue("");
  });

  it("closes the dropdown on blur", () => {
    mockCitiesResult({ data: [kyiv] });
    render(<CitySearch onSelect={vi.fn()} />);

    const input = screen.getByPlaceholderText("Search for a city…");
    fireEvent.change(input, { target: { value: "Kyi" } });
    expect(screen.getByRole("button", { name: /kyiv/i })).toBeInTheDocument();

    fireEvent.blur(input);

    expect(
      screen.queryByRole("button", { name: /kyiv/i }),
    ).not.toBeInTheDocument();
  });
});
