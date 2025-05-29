import dayjs from "dayjs";
import { getVietnamDate } from "@/utils/timeUtils";
import { Schedule } from "@/lib/models/Schedule";
import { useMemo } from "react";

const PERIOD_START_TIMES = [
  7 * 60 + 0, // Tiết 1: 07:00
  7 * 60 + 55, // Tiết 2: 07:55
  8 * 60 + 50, // Tiết 3: 08:50
  9 * 60 + 55, // Tiết 4: 09:55
  10 * 60 + 50, // Tiết 5: 10:50
  12 * 60 + 45, // Tiết 6: 12:45
  13 * 60 + 40, // Tiết 7: 13:40
  14 * 60 + 35, // Tiết 8: 14:35
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
  const getCurrentWeekNumber = (currentDate: dayjs.Dayjs): number => {
    if (!schedule) return 1;

    const startDate = dayjs(schedule.semesterStartDate);
    const diffDays = currentDate.diff(startDate, "day");
    const weekNumber = Math.ceil(diffDays / 7);
    return Math.max(1, weekNumber);
  };

  const getDayName = (date: dayjs.Dayjs): string => {
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return days[date.day()];
  };

  const getTodaySchedule = () => {
    if (!schedule) return null;

    const today = getVietnamDate();
    const weekNumber = getCurrentWeekNumber(today);
    const dayName = getDayName(today);

    return (
      schedule.weeklySchedules[weekNumber]?.dailySchedules[dayName] || null
    );
  };

  const getScheduleByWeekNumberAndDayName = (
    weekNumber: number,
    dayName: string
  ) => {
    if (!schedule) return null;

    return (
      schedule.weeklySchedules[weekNumber.toString()]?.dailySchedules[
        dayName
      ] || null
    );
  };

  const getScheduleByDate = (date: dayjs.Dayjs) => {
    if (!schedule) return null;

    const weekNumber = getCurrentWeekNumber(date);
    const dayName = getDayName(date);

    return getScheduleByWeekNumberAndDayName(weekNumber, dayName);
  };

  const getWeekSchedule = (weekNumber: number) => {
    if (!schedule) return null;

    return schedule.weeklySchedules[weekNumber.toString()] || null;
  };

  const getWeeks = (): { weekNumber: string; weekString: string }[] => {
    if (!schedule || !schedule.weeklySchedules || !schedule.semesterStartDate) {
      return [];
    }

    const numberOfWeek: number = Number(
      Object.keys(schedule.weeklySchedules).findLast((key) => key)
    );

    const weeks = [];
    const startDate = dayjs(schedule.semesterStartDate);

    for (let i = 1; i <= numberOfWeek; i++) {
      const weekNumber = i;
      const weekStart = startDate.add((weekNumber - 1) * 7, "day");
      const weekEnd = weekStart.add(6, "day");
      weeks.push({
        weekNumber: weekNumber.toString(),
        weekString: `Tuần ${weekNumber} - bắt đầu ${weekStart.format(
          "DD/MM/YYYY"
        )} đến ${weekEnd.format("DD/MM/YYYY")}`,
      });
    }

    weeks.sort((a, b) => Number(a.weekNumber) - Number(b.weekNumber));
    return weeks;
  };

  const getCurrentWeek = () => {
    const today = getVietnamDate();
    const weekNumber = getCurrentWeekNumber(today);
    return getWeekSchedule(weekNumber);
  };

  const getWeekDaysByWeekNumber = (weekNumber: string | number) => {
    if (!schedule || !schedule.semesterStartDate) return [];

    const weekNum =
      typeof weekNumber === "string" ? parseInt(weekNumber, 10) : weekNumber;

    const startDate = dayjs(schedule.semesterStartDate);
    const weekStart = startDate.add((weekNum - 1) * 7, "day");

    const days: { dayOfTheMonth: number; dayOfTheWeek: string }[] = [];
    const dayNames = [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "CN",
    ];

    for (let i = 0; i < 7; i++) {
      const date = weekStart.add(i, "day");
      days.push({
        dayOfTheMonth: date.date(),
        dayOfTheWeek: dayNames[i],
      });
    }

    return days;
  };

  const getNextClass = () => {
    if (!schedule) return null;

    const now = getVietnamDate();
    const currentTime = now.hour() * 60 + now.minute();

    const todaySchedule = getTodaySchedule();
    if (todaySchedule?.subjects) {
      for (const subject of todaySchedule.subjects) {
        const classStartTime = PERIOD_START_TIMES[subject.start - 1];
        if (classStartTime > currentTime) {
          return { subject, date: now.toDate(), isToday: true };
        }
      }
    }

    for (let i = 1; i <= 7; i++) {
      const futureDate = now.add(i, "day");
      const daySchedule = getScheduleByDate(futureDate);
      if (daySchedule?.subjects && daySchedule.subjects.length > 0) {
        return {
          subject: daySchedule.subjects[0],
          date: futureDate.toDate(),
          isToday: false,
        };
      }
    }

    return null;
  };

  const memoizedValues = useMemo(
    () => ({
      getCurrentWeekNumber,
      getWeeks,
      getDayName,
      getTodaySchedule,
      getScheduleByDate,
      getScheduleByWeekNumberAndDayName,
      getWeekSchedule,
      getCurrentWeek,
      getWeekDaysByWeekNumber,
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

export const getSubjectStatus = (
  start: number,
  numberOfLessons: number,
  subjectDateStr: string
): number => {
  // 0: Đã hoàn thành
  // 1: Đang diễn ra
  // 2: Sắp tới

  const now = getVietnamDate();
  const [subjectYear, subjectMonth, subjectDay] = subjectDateStr
    .split("-")
    .map(Number);

  const currentYear = now.year();
  const currentMonth = now.month() + 1; // dayjs.month() trả về 0-11
  const currentDay = now.date();

  const startTimeMinutes = PERIOD_START_TIMES[start - 1];
  const endTimeMinutes = PERIOD_END_TIMES[start + numberOfLessons - 2];
  const currentMinutes = now.hour() * 60 + now.minute();

  if (currentYear < subjectYear) return 2;
  if (currentMonth < subjectMonth) return 2;
  if (currentDay < subjectDay) return 2;

  if (
    currentYear === subjectYear &&
    currentMonth === subjectMonth &&
    currentDay === subjectDay
  ) {
    if (
      currentMinutes >= startTimeMinutes &&
      currentMinutes <= endTimeMinutes
    ) {
      return 1;
    }
  }

  return 0;
};
