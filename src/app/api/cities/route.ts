import { searchCities } from "@/lib/service/city-service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cityName = searchParams.get("name");

  if (!cityName) {
    return Response.json({ error: "Missing name parameter" }, { status: 400 });
  }

  try {
    const cityResponse = await searchCities(cityName);
    return Response.json(cityResponse);
  } catch {
    return Response.json({ error: "Failed to fetch city" }, { status: 500 });
  }
}
