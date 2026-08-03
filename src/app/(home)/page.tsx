import { getWeather } from "@/lib/weather-service";

export default async function Home() {
  const rawWeatherInfo = await getWeather(50.45, 30.52);

  console.log(rawWeatherInfo);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black">
        <h2>Test Title</h2>
      </section>
    </div>
  );
}
