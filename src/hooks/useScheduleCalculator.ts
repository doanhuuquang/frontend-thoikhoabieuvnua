import { Schedule } from "@/lib/models/Schedule";
import { useMemo } from "react";

export const useScheduleCalculator = (schedule: Schedule | null) => {
  const getCurrentWeekNumber = (currentDate: Date): number => {
    if (!schedule) return 1;

    const startDate = new Date(schedule.semesterStartDate);
    const diffTime = currentDate.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7) + 1;

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

    const today = new Date();
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
    const today = new Date();
    const weekNumber = getCurrentWeekNumber(today);
    return getWeekSchedule(weekNumber);
  };

  const getNextClass = () => {
    if (!schedule) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    // Check today first
    const todaySchedule = getTodaySchedule();
    if (todaySchedule?.subjects) {
      for (const subject of todaySchedule.subjects) {
        const classStartTime = (subject.start - 1) * 50 + 6 * 60 + 30; // Assuming classes start at 6:30 AM, each period is 45 mins
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

// utils/scheduleUtils.ts
export const formatClassTime = (
  start: number,
  numberOfLessons: number
): string => {
  const getTimeFromPeriod = (period: number): string => {
    // Assuming first period starts at 6:30 AM, each period is 45 minutes
    const minutesInPeriod = 50;
    const firstPeriodStart = 7 * 60; // 7:00 AM in minutes
    const startMinutes = firstPeriodStart + (period - 1) * minutesInPeriod;
    const hours = Math.floor(startMinutes / 60);
    const minutes = startMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const startTime = getTimeFromPeriod(start);
  const endTime = getTimeFromPeriod(start + numberOfLessons);

  return `${startTime} - ${endTime}`;
};

export const isClassHappening = (
  start: number,
  numberOfLessons: number
): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const classStartTime = 6 * 60 + 30 + (start - 1) * 45;
  const classEndTime = classStartTime + numberOfLessons * 45;

  return currentTime >= classStartTime && currentTime <= classEndTime;
};
