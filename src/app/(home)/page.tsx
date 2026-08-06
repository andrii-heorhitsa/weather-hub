import { CurrentWeather } from "@/features/current-weather";
import { WeatherWidget } from "@/features/weather-widget/weather-widget";
import { searchCities } from "@/lib/service/city-service";
import { getWeather } from "@/lib/service/weather-service";

export default async function Home() {
  // const rawWeatherInfo = await getWeather(50.45, 30.52);
  // console.log(rawWeatherInfo);
  const cities = await searchCities("Chernivtsi");
  console.log("cities:", cities);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black">
        <h2>Test Title</h2>
        <WeatherWidget />
        {/* <CurrentWeather latitude={48.2921} longitude={25.9352} /> */}
      </section>
    </div>
  );
}
