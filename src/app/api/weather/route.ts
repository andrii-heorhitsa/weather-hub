import { getWeather } from "@/lib/service/weather-service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  if (!latParam || !lonParam) {
    return Response.json(
      { error: "Missing required query parameters: lat and lon" },
      { status: 400 },
    );
  }

  const lat = Number(latParam);
  const lon = Number(lonParam);

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return Response.json(
      { error: "Invalid coordinate values" },
      { status: 400 },
    );
  }

  try {
    const weatherResponse = await getWeather(lat, lon);
    return Response.json(weatherResponse);
  } catch {
    return Response.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}
