import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { convertDateToString, getVietnamDate } from "@/utils/timeUtils";
import { Schedule, Subject } from "@/types/Schedule";
import { useMemo } from "react";

dayjs.extend(isSameOrBefore);

const DAYS_IN_WEEK = 7;
const WEEK_END_OFFSET = DAYS_IN_WEEK - 1;
const DAY_UNIT = "day";
const DATE_FORMAT = "YYYY-MM-DD";

export const useScheduleCalculator = (schedule: Schedule | null) => {
  const startDate = dayjs(schedule?.semesterStartDate);

  // Tính số tuần kể từ ngày bắt đầu học kỳ đến ngày truyền vào
  const getWeekNumberByDate = (date: dayjs.Dayjs): number => {
    if (!schedule?.semesterStartDate) return 0;
    const start = dayjs(schedule.semesterStartDate).startOf(DAY_UNIT);
    const end = date.startOf(DAY_UNIT);
    const diffDays = end.diff(start, DAY_UNIT);
    return Math.floor(diffDays / DAYS_IN_WEEK) + 1;
  };

  // Lấy số tuần hiện tại (theo ngày Việt Nam)
  const getCurrentWeekNumber = () => getWeekNumberByDate(getVietnamDate());

  // Lấy danh sách các tuần trong học kỳ
  const getWeeks = () => {
    if (!schedule?.schedules || !schedule.semesterStartDate) return [];

    const lastDateStr = Object.keys(schedule.schedules).findLast(Boolean);
    if (!lastDateStr) return [];

    const lastDateOfSemester = dayjs(lastDateStr).startOf(DAY_UNIT);
    const numberOfWeek = getWeekNumberByDate(lastDateOfSemester);
    const weeks = [];

    for (let i = 1; i <= numberOfWeek; i++) {
      const weekStart = startDate.add((i - 1) * DAYS_IN_WEEK, DAY_UNIT);
      const weekEnd = weekStart.add(WEEK_END_OFFSET, DAY_UNIT);
      weeks.push({
        weekNumber: i.toString(),
        weekStartDate: weekStart,
        weekEndDate: weekEnd,
      });
    }

    return weeks;
  };

  // Lấy lịch học theo ngày
  const getScheduleByDate = (date: dayjs.Dayjs): Subject[] => {
    if (!schedule) return [];
    const key = convertDateToString(date, "-", DATE_FORMAT);
    return schedule.schedules[key] || [];
  };

  // Lấy lịch học hôm nay
  const getTodaySchedule = () => getScheduleByDate(getVietnamDate());

  // Lấy lịch học trong tuần
  const getWeeklySchedule = ({
    weekStartDate,
    weekEndDate,
  }: {
    weekStartDate: dayjs.Dayjs;
    weekEndDate: dayjs.Dayjs;
  }): Subject[] => {
    if (!schedule) return [];
    const subjects: Subject[] = [];
    let current = weekStartDate.startOf(DAY_UNIT);
    const end = weekEndDate.startOf(DAY_UNIT);

    while (current.isSameOrBefore(end)) {
      const daySubjects =
        schedule.schedules[convertDateToString(current, "-", DATE_FORMAT)] ||
        [];
      subjects.push(...daySubjects);
      current = current.add(1, DAY_UNIT);
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
