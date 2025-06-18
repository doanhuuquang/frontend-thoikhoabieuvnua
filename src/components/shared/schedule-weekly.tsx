"use client";

import * as React from "react";
import dayjs from "dayjs";
import ScheduleItems from "@/components/shared/schedule-items";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { convertDateToString, getVietnamDate } from "@/utils/class-time-utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSchedule } from "@/hooks/use-schedule";

type Weeks = {
  weekNumber: string;
  weekStartDate: dayjs.Dayjs;
  weekEndDate: dayjs.Dayjs;
}[];

interface WeekSelectorProps {
  className?: string;
  value: string | number | undefined;
  onWeekChange: (weekNumber: string | number) => void;
  selectedDate: dayjs.Dayjs | null;
  onDateChange: (date: dayjs.Dayjs) => void;
}

const dayNameInVietnamese: Record<number, string> = {
  0: "CN",
  1: "Thứ 2",
  2: "Thứ 3",
  3: "Thứ 4",
  4: "Thứ 5",
  5: "Thứ 6",
  6: "Thứ 7",
};

const monthNameInVietnamese: Record<number, string> = {
  0: "Th 1",
  1: "Th 2",
  2: "Th 3",
  3: "Th 4",
  4: "Th 5",
  5: "Th 6",
  6: "Th 7",
  7: "Th 8",
  8: "Th 9",
  9: "Th 10",
  10: "Th 11",
  11: "Th 12",
};

const WeekDayItem = React.memo(
  ({
    date,
    selected,
    onClick,
    hasClass,
  }: {
    date: dayjs.Dayjs;
    selected: boolean;
    onClick: (date: dayjs.Dayjs) => void;
    hasClass?: boolean;
  }) => (
    <button
      onClick={() => onClick(date)}
      type="button"
      className={cn(
        "w-full relative p-1 bg-background dark:bg-sidebar rounded-md border flex flex-col items-center gap-1 justify-center text-center hover:border-primary hover:cursor-pointer transition",
        selected && "border-primary",
        convertDateToString(date, "-", "YYYY-MM-DD") ==
          convertDateToString(getVietnamDate(), "-", "YYYY-MM-DD") &&
          "bg-primary dark:bg-primary text-white"
      )}
    >
      <p className="lg:text-[15px] text-[10px] text-accent-foreground/50">
        {dayNameInVietnamese[date.day()]}
      </p>
      <p className="font-bold lg:text-[15px] text-[10px]">{date.date()}</p>
      <p className="lg:text-[15px] text-[10px] text-accent-foreground/50">
        {monthNameInVietnamese[date.month()]}
      </p>
      {hasClass && (
        <div className="bg-primary absolute -bottom-0.5 border-2 border-background -right-0.5 w-3 h-3 rounded-full"></div>
      )}
    </button>
  )
);
WeekDayItem.displayName = "WeekDayItem";

function WeekDaySelector({
  className,
  selectedDate,
  onSelect,
  startDate,
  endDate,
}: {
  className?: string;
  selectedDate: dayjs.Dayjs | null;
  onSelect: (selectedDate: dayjs.Dayjs) => void;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
}) {
  const { currentTimeTableSchedule } = useSchedule();
  const calculader = useScheduleCalculator(currentTimeTableSchedule);
  const days: dayjs.Dayjs[] = [];
  let current = startDate.startOf("day");
  const end = endDate.startOf("day");
  while (current.isSameOrBefore(end)) {
    days.push(current.clone());
    current = current.add(1, "day");
  }

  return (
    <div className={cn("flex gap-1", className)}>
      {days.map((day) => (
        <WeekDayItem
          key={day.format("YYYY-MM-DD")}
          date={day}
          onClick={onSelect}
          selected={selectedDate ? day.isSame(selectedDate, "day") : false}
          hasClass={calculader.getScheduleByDate(day).length > 0 ? true : false}
        />
      ))}
    </div>
  );
}

export function WeekSelector({
  className,
  value,
  onWeekChange,
  selectedDate,
  onDateChange,
}: WeekSelectorProps) {
  const { currentTimeTableSchedule } = useSchedule();
  const [open, setOpen] = React.useState(false);
  const calculator = useScheduleCalculator(currentTimeTableSchedule);
  const weeks: Weeks = calculator.getWeeks();

  const selectedWeek = weeks.find(
    (week) => week.weekNumber === value?.toString()
  );

  const currentWeek = weeks.find(
    (week) => week.weekNumber === calculator.getCurrentWeekNumber().toString()
  );

  const startDate = selectedWeek
    ? dayjs(selectedWeek.weekStartDate, "DD-MM-YYYY")
    : dayjs();
  const endDate = selectedWeek
    ? dayjs(selectedWeek.weekEndDate, "DD-MM-YYYY")
    : dayjs();

  return (
    <div className={cn("space-y-3", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full shadow-none">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full h-12"
          >
            <p className="truncate pr-2">
              {value
                ? (() => {
                    const week = weeks.find(
                      (week) => week.weekNumber === value
                    );
                    return week
                      ? `Tuần ${week.weekNumber} - Từ ngày
                    ${convertDateToString(
                      week.weekStartDate,
                      "/",
                      "DD-MM-YYYY"
                    )}
                    đến ngày
                    ${convertDateToString(week.weekEndDate, "/", "DD-MM-YYYY")}`
                      : "Chọn tuần học...";
                  })()
                : "Chọn tuần học..."}
            </p>
            <ChevronsUpDown className="opacity-50 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {weeks.map((week) => (
                  <CommandItem
                    key={week.weekNumber}
                    value={week.weekNumber}
                    onSelect={(currentValue) => {
                      onWeekChange(currentValue);
                      setOpen(false);
                    }}
                    className={
                      currentWeek === week
                        ? "bg-primary rounded-md text-white"
                        : ""
                    }
                  >
                    Tuần {week.weekNumber} - Từ ngày{" "}
                    {convertDateToString(week.weekStartDate, "/", "DD-MM-YYYY")}{" "}
                    đến ngày{" "}
                    {convertDateToString(week.weekEndDate, "/", "DD-MM-YYYY")}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === week.weekNumber ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {!selectedWeek ? (
        <Alert>
          <AlertTitle>
            Chúc mừng! Bạn đã hoàn thành tất cả lịch học của kỳ này rồi.
          </AlertTitle>
          <AlertDescription>
            Để xem lại lịch học trong học kỳ, chọn vào số tuần ở phía trên để
            xem lịch học nhé.
          </AlertDescription>
        </Alert>
      ) : (
        <WeekDaySelector
          selectedDate={selectedDate}
          onSelect={onDateChange}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </div>
  );
}

export const WeeklySchedule = () => {
  const { currentTimeTableSchedule } = useSchedule();
  const calculator = useScheduleCalculator(currentTimeTableSchedule);
  const currentWeekNumber = calculator.getCurrentWeekNumber().toString();

  const [weekNumber, setWeekNumber] = React.useState<string | number>(
    currentWeekNumber
  );
  const weeks = calculator.getWeeks();
  const selectedWeek = weeks.find(
    (w) => w.weekNumber === weekNumber.toString()
  );

  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(
    null
  );

  React.useEffect(() => {
    if (selectedWeek) {
      setSelectedDate(getVietnamDate);
    }
  }, [weekNumber]);

  const daySubjects = selectedDate
    ? calculator.getScheduleByDate(selectedDate)
    : [];

  return (
    <div className="space-y-10">
      <h4 className="font-semibold text-lg">Lịch học theo tuần</h4>
      <WeekSelector
        value={weekNumber}
        onWeekChange={setWeekNumber}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <ScheduleItems subjects={daySubjects} />
    </div>
  );
};
