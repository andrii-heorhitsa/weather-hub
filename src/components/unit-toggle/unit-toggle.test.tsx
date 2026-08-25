import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { UnitToggle } from "./index";
import { useUnitStore } from "@/store/unit-store";
import useHasHydrated from "@/hooks/use-has-hydrated";

vi.mock("@/hooks/use-has-hydrated");
vi.mock("@/store/unit-store");

describe("UnitToggle", () => {
  const mockToggleUnit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing (returns null) when hydration has not occurred yet", () => {
    vi.mocked(useHasHydrated).mockReturnValue(false);
    vi.mocked(useUnitStore).mockImplementation((selector) =>
      selector({ unit: "C", toggleUnit: mockToggleUnit }),
    );

    const { container } = render(<UnitToggle />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders button to switch to °F when current unit is Celsius and handles click", async () => {
    const user = userEvent.setup();
    vi.mocked(useHasHydrated).mockReturnValue(true);
    vi.mocked(useUnitStore).mockImplementation((selector) =>
      selector({ unit: "C", toggleUnit: mockToggleUnit }),
    );

    render(<UnitToggle />);

    const button = screen.getByRole("button", { name: /switch to °f/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(mockToggleUnit).toHaveBeenCalledTimes(1);
  });

  it("displays prompt to switch to °C when current unit is Fahrenheit", () => {
    vi.mocked(useHasHydrated).mockReturnValue(true);
    vi.mocked(useUnitStore).mockImplementation((selector) =>
      selector({ unit: "F", toggleUnit: mockToggleUnit }),
    );

    render(<UnitToggle />);

    expect(
      screen.getByRole("button", { name: /switch to °c/i }),
    ).toBeInTheDocument();
  });
});
