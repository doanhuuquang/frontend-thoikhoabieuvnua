"use client";

import ScheduleItems from "@/components/shared/schedule-items";
import { getVietnamDate } from "@/utils/class-time-utils";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import { useSchedule } from "@/hooks/use-schedule";

export const TodaySchedule = () => {
  const { currentTimeTableSchedule } = useSchedule();
  const { getTodaySchedule } = useScheduleCalculator(currentTimeTableSchedule);
  const todayClasses = getTodaySchedule();

  return (
    <div className="space-y-5">
      <h4 className="font-semibold text-lg flex items-center justify-between wrap">
        <span>Lịch học hôm nay</span>
        <span className="text-accent-foreground/50 font-light text-sm">
          {getVietnamDate().format("DD/MM/YYYY")}
        </span>
      </h4>
      <ScheduleItems subjects={todayClasses ?? []} />
    </div>
  );
};
