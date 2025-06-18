import WeatherSection from "@/components/shared/section-weather";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-3 grid grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-3  w-full max-w-7xl m-auto">
      {/* Main content */}
      <div className="lg:col-span-1 col-span-2 bg-background dark:bg-accent p-3 rounded-md space-y-3">
        {children}
      </div>

      {/* Weather */}
      <WeatherSection className="lg:col-span-1 col-span-2" />
    </div>
  );
}
