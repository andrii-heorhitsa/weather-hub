import type { CurrentWeatherDomain } from "@/types/weather";
import { weatherCodeToText } from "../weather/weather-code-to-text";

export async function getLLMAdvice(
  weather: CurrentWeatherDomain,
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: `Weather: ${weather.temperature}°C, ${weatherCodeToText(weather.weatherCode)}. Suggest what to wear in one short phrase.`,
          },
        ],
        max_completion_tokens: 300,
        temperature: 0.8,
        reasoning_effort: "low",
      }),
    },
  );

  if (!response.ok) throw new Error(`Groq request failed: ${response.status}`);

  const data = await response.json();
  return data.choices[0].message.content;
}
