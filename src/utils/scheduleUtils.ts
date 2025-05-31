import { getVietnamDate } from "@/utils/timeUtils";

const PERIOD_START_TIMES = [
  7 * 60 + 0,
  7 * 60 + 55,
  8 * 60 + 50,
  9 * 60 + 55,
  10 * 60 + 50,
  12 * 60 + 45,
  13 * 60 + 40,
  14 * 60 + 35,
  15 * 60 + 40,
  16 * 60 + 35,
  18 * 60 + 0,
  18 * 60 + 55,
  19 * 60 + 50,
];
const PERIOD_END_TIMES = [
  7 * 60 + 50,
  8 * 60 + 45,
  9 * 60 + 40,
  10 * 60 + 45,
  11 * 60 + 40,
  13 * 60 + 35,
  14 * 60 + 30,
  15 * 60 + 25,
  16 * 60 + 30,
  17 * 60 + 25,
  18 * 60 + 50,
  19 * 60 + 45,
  20 * 60 + 40,
];

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
  // 0: Đã hoàn thành, 1: Đang diễn ra, 2: Sắp tới
  const now = getVietnamDate();
  const [subjectYear, subjectMonth, subjectDay] = subjectDateStr
    .split("-")
    .map(Number);
  const currentYear = now.year();
  const currentMonth = now.month() + 1;
  const currentDay = now.date();
  const startTimeMinutes = PERIOD_START_TIMES[start - 1];
  const endTimeMinutes = PERIOD_END_TIMES[start + numberOfLessons - 2];
  const currentMinutes = now.hour() * 60 + now.minute();

  if (currentYear < subjectYear) return 2;
  if (currentYear === subjectYear && currentMonth < subjectMonth) return 2;
  if (
    currentYear === subjectYear &&
    currentMonth === subjectMonth &&
    currentDay < subjectDay
  )
    return 2;

  if (
    currentYear === subjectYear &&
    currentMonth === subjectMonth &&
    currentDay === subjectDay &&
    currentMinutes >= startTimeMinutes &&
    currentMinutes <= endTimeMinutes
  ) {
    return 1;
  }

  return 0;
};
