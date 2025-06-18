import WeatherSection from "@/components/shared/section-weather";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:flex flex-col flex-wrap lg:h-[calc(100vh-64px)] w-full max-w-7xl m-auto ">
      <div className="grow lg:h-[calc(100vh-64px)] h-fit lg:overflow-auto space-y-5 p-3 bg-background dark:bg-accent border-r">
        <div className="p-3 flex items-center justify-between gap-3 bg-secondary/5 rounded-md">
          <Button asChild className="grow" variant="outline">
            <Link href="/schedule/today">Ngày</Link>
          </Button>
          <Button asChild className="grow" variant="outline">
            <Link href="/schedule/weekly">Tuần</Link>
          </Button>
          <Button asChild className="grow" variant="outline">
            <Link href="/schedule/monthly">Tháng</Link>
          </Button>
        </div>
        {children}
      </div>
      <div className="grow p-3">
        <WeatherSection />
      </div>
    </div>
  );
}
