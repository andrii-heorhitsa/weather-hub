import { getLLMAdvice } from "@/lib/service/clothing-advice-service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const weather = await request.json();
  try {
    const advice = await getLLMAdvice(weather);
    return Response.json({ advice });
  } catch {
    return Response.json({ error: "LLM failed" }, { status: 500 });
  }
}
