import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";

import { ScheduleData } from "@/data/ScheduleData";

import WeatherBlock from "@/components/shared/WeatherBlock";
import { getVietnamDate } from "@/utils/timeUtils";
import { ScheduleItem } from "@/components/shared/ScheduleItem";

const TodayScheduleItemList = ({ className }: { className: string }) => {
  const { getTodaySchedule } = useScheduleCalculator(ScheduleData);
  const todayClasses = getTodaySchedule();

  if (!todayClasses?.subjects?.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Hôm nay không có lịch học -
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {todayClasses.subjects.map((subject) => ScheduleItem({ subject }))}
    </div>
  );
};

export const TodaySchedule = () => {
  return (
    <div className="space-y-5">
      <h4 className="font-semibold text-lg flex items-center justify-between wrap">
        <span>Lịch học hôm nay</span>
        <span className="text-accent-foreground/50 font-light text-sm">
          {getVietnamDate().toLocaleDateString()}
        </span>
      </h4>
      <div className="grid grid-flow-row grid-rows-1 grid-cols-4 gap-3">
        <TodayScheduleItemList className="lg:col-span-2 col-span-4" />
        <WeatherBlock className="lg:col-span-2 col-span-4" />
      </div>
      <div></div>
    </div>
  );
};
