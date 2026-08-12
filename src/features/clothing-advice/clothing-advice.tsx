import { useClothingAdvice } from "@/hooks/use-clothing-advice";
import { getRuleBasedAdvice } from "@/lib/clothing-advice/get-rule-based-advice";
import { CurrentWeatherDomain } from "@/types/weather";

export function ClothingAdvice({ weather }: { weather: CurrentWeatherDomain }) {
  const ruleBasedAdvice = getRuleBasedAdvice(weather);
  const { data: llmAdvice } = useClothingAdvice(weather);

  return <p>{llmAdvice ?? ruleBasedAdvice}</p>;
}
