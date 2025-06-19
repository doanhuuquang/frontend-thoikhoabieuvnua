import ScheduleMenu from "@/components/shared/schedule-menu";
import WeatherSection from "@/components/shared/section-weather";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex lg:flex-row flex-col flex-wrap gap-1 lg:h-[calc(100vh-65px)] h-fit w-full max-w-7xl m-auto p-1">
      <div className="grow lg:max-w-[450px] h-full lg:overflow-auto space-y-5 p-2 bg-background dark:bg-accent rounded-lg">
        <ScheduleMenu />
        {children}
      </div>
      <div className="grow h-full overflow-auto">
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
        <WeatherSection />
      </div>
    </div>
  );
}
