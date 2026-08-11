"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { createCityStore, type CityStore } from "@/store/city-store";
import type { CityResult } from "@/types/cities";

type CityStoreApi = ReturnType<typeof createCityStore>;

const CityStoreContext = createContext<CityStoreApi | null>(null);

export function CityStoreProvider({
  initialCity,
  children,
}: {
  initialCity: CityResult;
  children: ReactNode;
}) {
  const [store] = useState(() => createCityStore(initialCity));

  return (
    <CityStoreContext.Provider value={store}>
      {children}
    </CityStoreContext.Provider>
  );
}

export function useCityStore<T>(selector: (state: CityStore) => T): T {
  const context = useContext(CityStoreContext);
  if (!context) {
    throw new Error("useCityStore must be used within CityStoreProvider");
  }
  return useStore(context, selector);
}
