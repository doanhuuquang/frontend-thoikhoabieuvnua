import WeatherSection from "@/components/shared/section-weather";
import GreetingSection from "@/components/shared/section-greeting";

export default function Home() {
  return (
    <div className="w-full max-w-7xl m-auto p-3 grid grid-flow-row grid-cols-3 grid-rows-3 gap-3">
      <GreetingSection className="lg:col-span-2 col-span-3" />
      <WeatherSection className="lg:col-span-1 col-span-3" />
    </div>
  );
}
