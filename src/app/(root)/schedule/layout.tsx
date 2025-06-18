import ScheduleMenu from "@/components/shared/schedule-menu";
import WeatherSection from "@/components/shared/section-weather";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex flex-col flex-wrap lg:h-[calc(100vh-64px)] h w-full max-w-7xl m-auto ">
      <div className="lg:w-[40%] lg:h-[calc(100vh-64px)] h-fit lg:overflow-auto space-y-5 p-3 bg-background dark:bg-accent border-r">
        <ScheduleMenu />
        {children}
      </div>
      <div className="grow lg:w-[60%] p-3">
        <WeatherSection />
      </div>
    </div>
  );
}
