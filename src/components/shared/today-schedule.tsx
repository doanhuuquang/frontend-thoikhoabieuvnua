import ScheduleItemList from "@/components/shared/schedule-item-list";
import WeatherBlock from "@/components/shared/weather-block";
import { getVietnamDate } from "@/utils/timeUtils";
import { ScheduleData } from "@/data/ScheduleData";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";

export const TodaySchedule = () => {
  const { getTodaySchedule } = useScheduleCalculator(ScheduleData);
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
        <ScheduleItemList
          className="lg:col-span-2 col-span-4"
          subjects={todayClasses ?? []}
        />
        <WeatherBlock className="lg:col-span-2 col-span-4" />
      </div>
      <div></div>
    </div>
  );
};
