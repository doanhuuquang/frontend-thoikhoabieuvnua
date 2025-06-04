import WeatherBlock from "@/components/shared/weather-block";
import GreetingBlock from "@/components/shared/greeting-block";

export default function Home() {
  return (
    <div className="w-full max-w-7xl m-auto p-3 grid grid-flow-row grid-cols-3 grid-rows-3 gap-3">
      <GreetingBlock className="lg:col-span-2 col-span-3" />
      <WeatherBlock className="lg:col-span-1 col-span-3" />
    </div>
  );
}
