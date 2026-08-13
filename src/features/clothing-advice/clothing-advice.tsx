import { useClothingAdvice } from "@/hooks/use-clothing-advice";
import { getRuleBasedAdvice } from "@/lib/clothing-advice/get-rule-based-advice";
import { CurrentWeatherDomain } from "@/types/weather";
import { ClothingAdviceSkeleton } from "./clothing-advice-skeleton";

export function ClothingAdvice({ weather }: { weather: CurrentWeatherDomain }) {
  const ruleBasedAdvice = getRuleBasedAdvice(weather);
  const { data: llmAdvice, isPending } = useClothingAdvice(weather);

  if (isPending) return <ClothingAdviceSkeleton />;

  return <p>{llmAdvice ?? ruleBasedAdvice}</p>;
}
