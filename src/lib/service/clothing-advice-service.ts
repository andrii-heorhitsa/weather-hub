import type { CurrentWeatherDomain } from "@/types/weather";
import { weatherCodeToText } from "../weather/weather-code-to-text";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

type GroqChatResponse = {
  choices: { message: { content: string | null } }[];
};

const SYSTEM_PROMPT =
  "You are a practical clothing assistant in a weather app. " +
  "Reply in English with one or two short sentences, 20 to 30 words. " +
  "Use plain, direct language without decorative adjectives (no 'cozy', 'soft', 'finish the look'). " +
  "Cover the outer layer, footwear and one accessory if useful (umbrella, scarf, sunglasses, hat). " +
  "Consider the feels-like temperature, wind and precipitation. " +
  "No markdown, no emoji, no quotes.";

const EXAMPLE: ChatMessage[] = [
  {
    role: "user",
    content:
      "Temperature 10°C, feels like 7°C, slight rain, wind 18 km/h, precipitation 1.2 mm.",
  },
  {
    role: "assistant",
    content:
      "Go for a trench coat over a warm sweater and waterproof boots. The wind makes it feel colder, so grab an umbrella and a light scarf.",
  },
  {
    role: "user",
    content:
      "Temperature 24°C, feels like 25°C, clear sky, wind 6 km/h, precipitation 0 mm.",
  },
  {
    role: "assistant",
    content:
      "A breathable T-shirt with light chinos and canvas sneakers is perfect today. Sunglasses will help in the bright sun.",
  },
];

function describeWeather(w: CurrentWeatherDomain): string {
  return `Temperature ${w.temperature}°C, feels like ${w.apparentTemperature}°C, ${weatherCodeToText(w.weatherCode)}, wind ${w.windSpeed} km/h, precipitation ${w.precipitation} mm.`;
}

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
          { role: "system", content: SYSTEM_PROMPT },
          ...EXAMPLE,
          { role: "user", content: describeWeather(weather) },
        ],
        max_completion_tokens: 300,
        temperature: 0.5,
        reasoning_effort: "low",
      }),
    },
  );

  if (!response.ok) throw new Error(`Groq request failed: ${response.status}`);

  const data: GroqChatResponse = await response.json();
  const advice = data.choices[0]?.message.content?.trim();

  if (!advice) throw new Error("Groq returned an empty answer");
  return advice;
}
