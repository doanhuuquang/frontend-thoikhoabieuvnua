"use client";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import { ScheduleData } from "@/data/ScheduleData";
import dayjs from "dayjs";
import { getVietnamDate } from "@/utils/class-time-utils";
import ScheduleItems from "@/components/shared/schedule-items";
import { cn } from "@/lib/utils";

function CalendarSelector({
  selected,
  onSelected,
  className,
}: {
  selected: dayjs.Dayjs;
  onSelected: (date: dayjs.Dayjs) => void;
  className: string;
}) {
  const { startDate, getScheduleByDate } = useScheduleCalculator(ScheduleData);

  const isHasSchedule = (day: Date) => {
    const schedule = getScheduleByDate(dayjs(day));
    return !!(schedule && schedule.length > 0);
  };

  return (
    <Calendar
      mode="single"
      selected={selected.toDate()}
      onSelect={(selected) => {
        if (selected) onSelected(dayjs(selected));
      }}
      fromDate={startDate.toDate()}
      modifiers={{
        has_schedule: isHasSchedule,
      }}
      modifiersClassNames={{
        has_schedule:
          "relative after:bg-primary after:absolute after:-bottom-0.5 after:border-2 after:border-sidebar after:border-background after:-right-0.5 after:w-3 after:h-3 after:rounded-full",
      }}
      className={cn(
        "rounded-md border shadow bg-background dark:bg-sidebar w-full",
        className
      )}
    />
  );
}

export default function MonthlySchedule() {
  const [selected, setSelected] = React.useState(getVietnamDate());
  const calculator = useScheduleCalculator(ScheduleData);
  const daySubjects = selected ? calculator.getScheduleByDate(selected) : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-semibold text-lg">Lịch học theo tháng</h4>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4 items-start">
        <ScheduleItems className="lg:w-[50%] w-[100%]" subjects={daySubjects} />
        <CalendarSelector
          className="lg:w-[50%] w-[100%]"
          selected={selected}
          onSelected={setSelected}
        />
      </div>
    </div>
  );
}
