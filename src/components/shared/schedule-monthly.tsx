"use client";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import dayjs from "dayjs";
import { getVietnamDate } from "@/utils/class-time-utils";
import ScheduleItems from "@/components/shared/schedule-items";
import { cn } from "@/lib/utils";
import { useSchedule } from "@/hooks/use-schedule";

function CalendarSelector({
  selected,
  onSelected,
  className,
}: {
  selected: dayjs.Dayjs;
  onSelected: (date: dayjs.Dayjs) => void;
  className?: string;
}) {
  const { currentTimeTableSchedule } = useSchedule();
  const { startDate, getScheduleByDate } = useScheduleCalculator(
    currentTimeTableSchedule
  );

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
        "rounded-md w-full bg-background dark:bg-accent border-t border-b py-5 px-0",
        className
      )}
    />
  );
}

export default function MonthlySchedule() {
  const { currentTimeTableSchedule } = useSchedule();
  const [selected, setSelected] = React.useState<dayjs.Dayjs | null>(null);

  const calculator = useScheduleCalculator(currentTimeTableSchedule);
  const daySubjects =
    selected && currentTimeTableSchedule
      ? calculator.getScheduleByDate(selected)
      : [];

  React.useEffect(() => {
    if (!selected) {
      setSelected(getVietnamDate());
    }
  }, [selected]);

  if (!selected) return null;

  return (
    <div className="space-y-5">
      <h4 className="font-semibold text-lg">Lịch học theo tháng</h4>
      <CalendarSelector selected={selected} onSelected={setSelected} />
      <ScheduleItems subjects={daySubjects} />
    </div>
  );
}
