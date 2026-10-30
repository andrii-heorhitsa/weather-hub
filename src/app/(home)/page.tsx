import { WeatherWidget } from "@/features/weather-widget/weather-widget";
import { getCityFromCookie } from "@/lib/get-city-from-cookie";
import { getQueryClient } from "@/lib/get-query-client";
import { getWeather } from "@/lib/service/weather-service";
import { CityStoreProvider } from "@/providers/city-store-provider";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const city = await getCityFromCookie();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["weather", city.latitude, city.longitude],
    queryFn: () => getWeather(city.latitude, city.longitude),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CityStoreProvider initialCity={city}>
        <div className="flex flex-col flex-1 items-center justify-center bg-canvas font-sans">
          <section className="flex flex-1 w-full max-w-3xl flex-col items-center px-4 py-8 sm:px-16 sm:py-20 bg-surface">
            <WeatherWidget />
          </section>
        </div>
      </CityStoreProvider>
    </HydrationBoundary>
  );
}
