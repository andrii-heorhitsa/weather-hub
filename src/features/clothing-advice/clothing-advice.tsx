import { useClothingAdvice } from "@/hooks/use-clothing-advice";
import { CurrentWeatherDomain } from "@/types/weather";
import { ClothingAdviceSkeleton } from "./clothing-advice-skeleton";
import { Shirt, Wind } from "lucide-react";

export function ClothingAdvice({ weather }: { weather: CurrentWeatherDomain }) {
  const { data: advice, isPending } = useClothingAdvice(weather);

  return (
    <div className="w-full text-center">
      <div className="flex items-center justify-center gap-2">
        {weather.temperature >= 24 ? (
          <Shirt className="h-4 w-4 text-ink-muted" aria-hidden="true" />
        ) : (
          <Wind className="h-4 w-4 text-ink-muted" aria-hidden="true" />
        )}

        <p className="text-sm tracking-wide text-ink-muted uppercase">
          Clothing advice for this moment:
        </p>
      </div>

      {isPending ? (
        <div className="mt-3 flex justify-center">
          <ClothingAdviceSkeleton />
        </div>
      ) : (
        <p className="mt-3 font-display text-lg text-ink">{advice}</p>
      )}
    </div>
  );
}
