import { createStore } from "zustand";
import type { CityResult } from "@/types/cities";

export type CityStore = {
  selectedCity: CityResult;
  setSelectedCity: (city: CityResult) => void;
};

export function createCityStore(initialCity: CityResult) {
  return createStore<CityStore>((set) => ({
    selectedCity: initialCity,
    setSelectedCity: (city) => set({ selectedCity: city }),
  }));
}
