import { WeatherWidget } from "@/features/weather-widget/weather-widget";
import { getCityFromCookie } from "@/lib/get-city-from-cookie";
import { getQueryClient } from "@/lib/get-query-client";
import { searchCities } from "@/lib/service/city-service";
import { getWeather } from "@/lib/service/weather-service";
import { CityStoreProvider } from "@/providers/city-store-provider";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  // const rawWeatherInfo = await getWeather(50.45, 30.52);
  // console.log(rawWeatherInfo);
  // const cities = await searchCities("Chernivtsi");
  // console.log("cities:", cities);

  const city = await getCityFromCookie();
  const queryClient = getQueryClient();
  console.log(city);

  await queryClient.prefetchQuery({
    queryKey: ["weather", city.latitude, city.longitude],
    queryFn: () => getWeather(city.latitude, city.longitude),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CityStoreProvider initialCity={city}>
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <section className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black">
            <WeatherWidget />
          </section>
        </div>
      </CityStoreProvider>
    </HydrationBoundary>
  );
}
