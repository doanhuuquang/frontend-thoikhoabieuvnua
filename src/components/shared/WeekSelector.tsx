"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVietnamDate } from "@/utils/timeUtils";
import { ScheduleData } from "@/data/ScheduleData";
import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";
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
import dayjs from "dayjs";

type Weeks = { weekNumber: string; weekString: string }[];

type WeekDay = {
  dayOfTheMonth: number;
  dayOfTheWeek: string;
};

interface WeekSelectorProps {
  className?: string;
  value: string | number | undefined;
  onWeekChange: (weekNumber: string | number) => void;
  dayName: string;
  onDayChange: (dayName: string) => void;
}

const weekDays: WeekDay[] = [
  { dayOfTheMonth: 1, dayOfTheWeek: "Thứ 2" },
  { dayOfTheMonth: 2, dayOfTheWeek: "Thứ 3" },
  { dayOfTheMonth: 3, dayOfTheWeek: "Thứ 4" },
  { dayOfTheMonth: 4, dayOfTheWeek: "Thứ 5" },
  { dayOfTheMonth: 5, dayOfTheWeek: "Thứ 6" },
  { dayOfTheMonth: 6, dayOfTheWeek: "Thứ 7" },
  { dayOfTheMonth: 7, dayOfTheWeek: "CN" },
];

const vietnameseToEnglishDay: Record<string, string> = {
  "Thứ 2": "MONDAY",
  "Thứ 3": "TUESDAY",
  "Thứ 4": "WEDNESDAY",
  "Thứ 5": "THURSDAY",
  "Thứ 6": "FRIDAY",
  "Thứ 7": "SATURDAY",
  CN: "SUNDAY",
};

const WeekDayItem = React.memo(
  ({
    dayOfTheMonth,
    dayOfTheWeek,
    selected,
    onClick,
    hasClass,
    isToday,
  }: {
    dayOfTheMonth: number;
    dayOfTheWeek: string;
    selected: boolean;
    onClick: (dayOfTheWeek: string) => void;
    hasClass?: boolean;
    isToday?: boolean;
  }) => (
    <button
      onClick={() => onClick(dayOfTheWeek)}
      type="button"
      className={cn(
        "w-full relative p-1 bg-background dark:bg-sidebar  rounded-md border flex flex-col items-center gap-1 justify-center text-center hover:border-primary hover:cursor-pointer transition",
        selected && "border-primary ",
        isToday && "bg-primary dark:bg-primary text-white"
      )}
    >
      <p className="lg:text-[15px] text-[10px] text-accent-foreground/50">
        {dayOfTheWeek}
      </p>
      <p className="font-bold lg:text-[15px] text-[10px]">{dayOfTheMonth}</p>
      {hasClass && (
        <div className="bg-primary absolute -bottom-0.5 border-2 border-background -right-0.5 w-3 h-3 rounded-full"></div>
      )}
    </button>
  )
);
WeekDayItem.displayName = "WeekDayItem";

function WeekDaySelector({
  className,
  selectedDay,
  onSelect,
  days,
  hasClassMap,
  todayInfo,
}: {
  className?: string;
  selectedDay: string | null;
  onSelect: (dayOfTheWeek: string) => void;
  days: WeekDay[];
  hasClassMap: Record<string, boolean>;
  todayInfo: { day: number; month: number; year: number };
}) {
  return (
    <div className={cn("flex gap-1", className)}>
      {days.map((day) => (
        <WeekDayItem
          key={day.dayOfTheMonth}
          dayOfTheMonth={day.dayOfTheMonth}
          dayOfTheWeek={day.dayOfTheWeek}
          selected={selectedDay === day.dayOfTheWeek}
          onClick={onSelect}
          hasClass={hasClassMap[day.dayOfTheWeek]}
          isToday={
            day.dayOfTheMonth === todayInfo.day &&
            todayInfo.month === dayjs().month() + 1 &&
            todayInfo.year === dayjs().year()
          }
        />
      ))}
    </div>
  );
}

export default function WeekSelector({
  className,
  value,
  onWeekChange,
  dayName,
  onDayChange,
}: WeekSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const calculator = useScheduleCalculator(ScheduleData);
  const weeks: Weeks = calculator.getWeeks();

  const today = getVietnamDate();
  const todayInfo = {
    day: today.date(),
    month: today.month() + 1,
    year: today.year(),
  };
  const currentWeek = weeks.find(
    (week) =>
      week.weekNumber === calculator.getCurrentWeekNumber(today).toString()
  );

  const daysOfWeek = React.useMemo(() => {
    if (value) return calculator.getWeekDaysByWeekNumber(value);
    return weekDays;
  }, [value]);

  const hasClassMap = React.useMemo(() => {
    const map: Record<string, boolean> = {};
    daysOfWeek.forEach((day) => {
      const englishDay = vietnameseToEnglishDay[day.dayOfTheWeek];
      const schedule = calculator.getScheduleByWeekNumberAndDayName(
        Number(value),
        englishDay
      );
      map[day.dayOfTheWeek] = !!(
        schedule &&
        schedule.subjects &&
        schedule.subjects.length > 0
      );
    });
    return map;
  }, [daysOfWeek, value, calculator]);

  return (
    <div className={cn("space-y-3", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full h-12"
          >
            <p className="truncate pr-2">
              {value
                ? weeks.find((week) => week.weekNumber === value)?.weekString
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
                    {week.weekString}
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

      <WeekDaySelector
        selectedDay={dayName}
        onSelect={onDayChange}
        days={daysOfWeek}
        hasClassMap={hasClassMap}
        todayInfo={todayInfo}
      />
    </div>
  );
}
