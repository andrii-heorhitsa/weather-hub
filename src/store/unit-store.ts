import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TemperatureUnit = "C" | "F";

type UnitStore = {
  unit: TemperatureUnit;
  toggleUnit: () => void;
};

export const useUnitStore = create<UnitStore>()(
  persist(
    (set) => ({
      unit: "C",
      toggleUnit: () =>
        set((state) => ({ unit: state.unit === "C" ? "F" : "C" })),
    }),
    { name: "unit-storage" },
  ),
);
