import { getRuleBasedAdvice } from "@/lib/clothing-advice/get-rule-based-advice";
import { getLLMAdvice } from "@/lib/service/clothing-advice-service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const weather = await request.json();
  try {
    const advice = await getLLMAdvice(weather);
    return Response.json({ advice });
  } catch {
    return Response.json({ advice: getRuleBasedAdvice(weather) });
  }
}
