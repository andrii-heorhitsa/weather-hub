import { NextRequest, NextResponse } from "next/server";
import { reverseGeocode } from "@/lib/service/reverse-geocoding-service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Missing lat/lon parameter" },
      { status: 400 },
    );
  }

  try {
    const city = await reverseGeocode(Number(lat), Number(lon));
    return NextResponse.json(city);
  } catch {
    return NextResponse.json(
      { error: "Failed to reverse geocode" },
      { status: 500 },
    );
  }
}
