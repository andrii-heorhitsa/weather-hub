import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export default function useHasHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
