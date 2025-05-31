import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { convertDateToString, getVietnamDate } from "@/utils/timeUtils";
import { Schedule, Subject } from "@/lib/models/Schedule";
import { useMemo } from "react";

dayjs.extend(isSameOrBefore);

export const useScheduleCalculator = (schedule: Schedule | null) => {
  const startDate = dayjs(schedule?.semesterStartDate);

  const getWeekNumberByDate = (date: dayjs.Dayjs): number => {
    if (!schedule || !schedule.semesterStartDate) return 0;

    const start = dayjs(schedule.semesterStartDate).startOf("day");
    const end = date.startOf("day");
    const diffDays = end.diff(start, "day");

    return Math.floor(diffDays / 7) + 1;
  };

  const getCurrentWeekNumber = () => {
    return getWeekNumberByDate(getVietnamDate());
  };

  const getWeeks = (): {
    weekNumber: string;
    weekStartDate: dayjs.Dayjs;
    weekEndDate: dayjs.Dayjs;
  }[] => {
    if (!schedule || !schedule.schedules || !schedule.semesterStartDate) {
      return [];
    }

    const lastDateOfSemester = dayjs(
      Object.keys(schedule.schedules).findLast((key) => key)
    ).startOf("day");
    const numberOfWeek: number = getWeekNumberByDate(lastDateOfSemester);
    const weeks = [];
    const startDate = dayjs(schedule.semesterStartDate);

    for (let i = 1; i <= numberOfWeek; i++) {
      const weekNumber = i;
      const weekStart = startDate.add((weekNumber - 1) * 7, "day");
      const weekEnd = weekStart.add(6, "day");
      weeks.push({
        weekNumber: weekNumber.toString(),
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
      });
    }

    weeks.sort((a, b) => Number(a.weekNumber) - Number(b.weekNumber));
    return weeks;
  };

  const getScheduleByDate = (date: dayjs.Dayjs): Subject[] => {
    if (!schedule) return [];
    return (
      schedule.schedules[convertDateToString(date, "-", "YYYY-MM-DD")] || []
    );
  };

  const getTodaySchedule = (): Subject[] => {
    return getScheduleByDate(getVietnamDate());
  };

  const getWeeklySchedule = ({
    weekStartDate,
    weekEndDate,
  }: {
    weekStartDate: dayjs.Dayjs;
    weekEndDate: dayjs.Dayjs;
  }): Subject[] => {
    if (!schedule) return [];

    const subjects: Subject[] = [];
    let current = weekStartDate.startOf("day");
    const end = weekEndDate.startOf("day");

    while (current.isSameOrBefore(end)) {
      const daySubjects =
        schedule.schedules[convertDateToString(current)] || [];

      subjects.push(...daySubjects);
      current = current.add(1, "day");
    }

    return subjects;
  };

  return useMemo(
    () => ({
      startDate,
      getCurrentWeekNumber,
      getWeeks,
      getTodaySchedule,
      getScheduleByDate,
      getWeeklySchedule,
    }),
    [schedule]
  );
};
