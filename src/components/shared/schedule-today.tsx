import ScheduleItems from "@/components/shared/schedule-items";
import WeatherBlock from "@/components/shared/section-weather";
import { getVietnamDate } from "@/utils/class-time-utils";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import { useSchedule } from "@/hooks/use-schedule";

export const TodaySchedule = () => {
  const { currentSchedule } = useSchedule();
  const { getTodaySchedule } = useScheduleCalculator(currentSchedule);
  const todayClasses = getTodaySchedule();

  return (
    <div className="space-y-5">
      <h4 className="font-semibold text-lg flex items-center justify-between wrap">
        <span>Lịch học hôm nay</span>
        <span className="text-accent-foreground/50 font-light text-sm">
          {getVietnamDate().format("DD/MM/YYYY")}
        </span>
      </h4>
      <div className="grid grid-flow-row grid-rows-1 grid-cols-4 gap-3">
        <ScheduleItems
          className="lg:col-span-2 col-span-4"
          subjects={todayClasses ?? []}
        />
        <WeatherBlock className="lg:col-span-2 col-span-4" />
      </div>
      <div></div>
    </div>
  );
};
