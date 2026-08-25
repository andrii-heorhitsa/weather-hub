"use client";

import { useUnitStore } from "@/store/unit-store";
import useHasHydrated from "@/hooks/use-has-hydrated";

export function UnitToggle() {
  const unit = useUnitStore((s) => s.unit);
  const toggleUnit = useUnitStore((s) => s.toggleUnit);
  const hasHydrated = useHasHydrated();

  if (!hasHydrated) return null;

  return (
    <button
      type="button"
      onClick={toggleUnit}
      className="cursor-pointer rounded-full border border-hairline px-3 py-1 text-xs tracking-wide text-ink-muted uppercase transition-colors hover:border-ink hover:text-ink"
    >
      Switch to °{unit === "C" ? "F" : "C"}
    </button>
  );
}
