"use client";

import WeekSelector from "@/components/shared/WeekSelector";
import { ScheduleData } from "@/data/ScheduleData";
import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";
import { ScheduleItem } from "@/components/shared/ScheduleItem";
import * as React from "react";
import { getVietnamDate } from "@/utils/timeUtils";

const vietnameseToEnglishDay: Record<string, string> = {
  "Thứ 2": "MONDAY",
  "Thứ 3": "TUESDAY",
  "Thứ 4": "WEDNESDAY",
  "Thứ 5": "THURSDAY",
  "Thứ 6": "FRIDAY",
  "Thứ 7": "SATURDAY",
  CN: "SUNDAY",
};

const WeeklyScheduleItemList = ({
  className,
  weekNumber,
  dayName,
}: {
  className?: string;
  weekNumber: number;
  dayName: string;
}) => {
  const { getScheduleByWeekNumberAndDayName } =
    useScheduleCalculator(ScheduleData);
  const todayClasses = getScheduleByWeekNumberAndDayName(weekNumber, dayName);

  if (!todayClasses?.subjects?.length) {
    return (
      <div className={className}>
        <p className="text-gray-500 text-sm lg:text-start text-center">
          Yeahhhhh! Không có lịch học. Hãy tận dụng thời gian rảnh để tự học
          thêm kiến thức nhé
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {todayClasses.subjects.map((subject) => ScheduleItem({ subject }))}
    </div>
  );
};

export const WeeklySchedule = () => {
  const calculator = useScheduleCalculator(ScheduleData);
  const today = getVietnamDate();
  const currentWeekNumber = calculator.getCurrentWeekNumber(today).toString();

  const [weekNumber, setWeekNumber] = React.useState<string | number>(
    currentWeekNumber
  );
  const [dayName, setDayName] = React.useState<string>("MONDAY"); // hoặc giá trị mặc định phù hợp

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-semibold text-lg">Lịch học theo tuần</h4>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4 items-start">
        <WeeklyScheduleItemList
          className="lg:w-[50%] w-[100%]"
          weekNumber={Number(weekNumber)}
          dayName={vietnameseToEnglishDay[dayName] || dayName}
        />
        <WeekSelector
          className="lg:w-[50%] w-[100%]"
          value={weekNumber}
          onWeekChange={setWeekNumber}
          dayName={dayName}
          onDayChange={setDayName}
        />
      </div>
    </div>
  );
};
