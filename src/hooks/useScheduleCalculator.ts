import { Schedule } from "@/lib/models/Schedule";
import { useMemo } from "react";

import { getVietnamDate } from "@/utils/timeUtils";

const PERIOD_START_TIMES = [
  7 * 60 + 0, // Tiết 1: 07:00
  7 * 60 + 55, // Tiết 2: 07:55
  8 * 60 + 50, // Tiết 3: 08:50
  9 * 60 + 55, // Tiết 4: 09:55
  10 * 60 + 50, // Tiết 5: 10:50
  12 * 60 + 45, // Tiết 6: 12:45
  13 * 60 + 40, // Tiết 7: 13:50
  14 * 60 + 35, // Tiết 8: 14:50
  15 * 60 + 40, // Tiết 9: 15:40
  16 * 60 + 35, // Tiết 10: 16:35
  18 * 60 + 0, // Tiết 11: 18:00
  18 * 60 + 55, // Tiết 12: 18:55
  19 * 60 + 50, // Tiết 13: 19:50
];

const PERIOD_END_TIMES = [
  7 * 60 + 50, // Tiết 1: 07:50
  8 * 60 + 45, // Tiết 2: 08:45
  9 * 60 + 40, // Tiết 3: 09:40
  10 * 60 + 45, // Tiết 4: 10:45
  11 * 60 + 40, // Tiết 5: 11:40
  13 * 60 + 35, // Tiết 6: 13:35
  14 * 60 + 30, // Tiết 7: 14:30
  15 * 60 + 25, // Tiết 8: 15:25
  16 * 60 + 30, // Tiết 9: 16:30
  17 * 60 + 25, // Tiết 10: 17:25
  18 * 60 + 50, // Tiết 11: 18:50
  19 * 60 + 45, // Tiết 12: 19:45
  20 * 60 + 40, // Tiết 13: 20:40
];

export const useScheduleCalculator = (schedule: Schedule | null) => {
  const getCurrentWeekNumber = (currentDate: Date): number => {
    if (!schedule) return 1;

    const startDate = new Date(schedule.semesterStartDate);
    const diffTime = currentDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.ceil(diffDays / 7);
    return Math.max(1, weekNumber);
  };

  const getDayName = (date: Date): string => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[date.getDay()];
  };

  const getTodaySchedule = () => {
    if (!schedule) return null;

    const today = getVietnamDate();
    const weekNumber = getCurrentWeekNumber(today);
    const dayName = getDayName(today);

    return (
      schedule.weeklySchedules[weekNumber.toString()]?.dailySchedules[
        dayName
      ] || null
    );
  };

  const getScheduleByDate = (date: Date) => {
    if (!schedule) return null;

    const weekNumber = getCurrentWeekNumber(date);
    const dayName = getDayName(date);

    return (
      schedule.weeklySchedules[weekNumber.toString()]?.dailySchedules[
        dayName
      ] || null
    );
  };

  const getWeekSchedule = (weekNumber: number) => {
    if (!schedule) return null;

    return schedule.weeklySchedules[weekNumber.toString()] || null;
  };

  const getCurrentWeek = () => {
    const today = getVietnamDate();
    const weekNumber = getCurrentWeekNumber(today);
    return getWeekSchedule(weekNumber);
  };

  const getNextClass = () => {
    if (!schedule) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const todaySchedule = getTodaySchedule();
    if (todaySchedule?.subjects) {
      for (const subject of todaySchedule.subjects) {
        const classStartTime = PERIOD_START_TIMES[subject.start - 1];
        if (classStartTime > currentTime) {
          return { subject, date: now, isToday: true };
        }
      }
    }

    for (let i = 1; i <= 7; i++) {
      const futureDate = new Date(now);
      futureDate.setDate(now.getDate() + i);

      const daySchedule = getScheduleByDate(futureDate);
      if (daySchedule?.subjects && daySchedule.subjects.length > 0) {
        return {
          subject: daySchedule.subjects[0],
          date: futureDate,
          isToday: false,
        };
      }
    }

    return null;
  };

  const memoizedValues = useMemo(
    () => ({
      getCurrentWeekNumber,
      getDayName,
      getTodaySchedule,
      getScheduleByDate,
      getWeekSchedule,
      getCurrentWeek,
      getNextClass,
    }),
    [schedule]
  );

  return memoizedValues;
};

const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

export const formatClassTime = (
  start: number,
  numberOfLessons: number
): string => {
  const startTime = PERIOD_START_TIMES[start - 1];
  const endTime = PERIOD_END_TIMES[start + numberOfLessons - 2];

  return `${minutesToTime(startTime)} - ${minutesToTime(endTime)}`;
};

export const isClassDoned = (
  start: number,
  numberOfLessons: number,
  subjectDateStr: string
): boolean => {
  const now = getVietnamDate();

  const [subjectYear, subjectMonth, subjectDay] = subjectDateStr
    .split("-")
    .map(Number);

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();

  const endTimeMinutes = PERIOD_END_TIMES[start + numberOfLessons - 2];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  if (currentYear < subjectYear) return false;
  if (currentMonth < subjectMonth) return false;
  if (currentDay < subjectDay) return false;

  if (
    currentYear == subjectYear &&
    currentMonth == subjectMonth &&
    currentDay == subjectDay
  ) {
    return currentMinutes >= endTimeMinutes;
  }

  return true;
};
