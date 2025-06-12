import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Giờ bắt đầu của từng tiết học trong ngày (tính theo phút từ 00:00)
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
// Giờ kết thúc của từng tiết học trong ngày (tính theo phút từ 00:00)
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

export const getVietnamDate = (): dayjs.Dayjs => {
  return dayjs().tz("Asia/Ho_Chi_Minh");
};

export const convertDateToString = (
  date: dayjs.Dayjs,
  separator: string = "-",
  format: "YYYY-MM-DD" | "DD-MM-YYYY" | "MM-DD-YYYY" = "YYYY-MM-DD"
): string => {
  const year = date.year().toString().padStart(4, "0");
  const month = (date.month() + 1).toString().padStart(2, "0");
  const day = date.date().toString().padStart(2, "0");

  if (format === "YYYY-MM-DD") return [year, month, day].join(separator);
  if (format === "DD-MM-YYYY") return [day, month, year].join(separator);
  if (format === "MM-DD-YYYY") return [month, day, year].join(separator);

  // fallback
  return [year, month, day].join(separator);
};

// Chuyển đổi phút thành chuỗi thời gian "HH:mm"
const convertMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

// Định dạng thời gian bắt đầu và kết thúc của tiết học
export const formatClassTime = (
  start: number,
  numberOfLessons: number
): string => {
  const startTime = PERIOD_START_TIMES[start - 1];
  const endTime = PERIOD_END_TIMES[start + numberOfLessons - 2];
  return `${convertMinutesToTime(startTime)} - ${convertMinutesToTime(
    endTime
  )}`;
};

// Lấy trạng thái của môn học dựa trên thời gian và ngày
// 0: Đã hoàn thành, 1: Đang diễn ra, 2: Sắp tới
export const getSubjectStatus = (
  start: number,
  numberOfLessons: number,
  subjectDateStr: string
): number => {
  const now = getVietnamDate();
  const [subjectYear, subjectMonth, subjectDay] = subjectDateStr
    .split("-")
    .map(Number);

  const subjectDate = now
    .clone()
    .year(subjectYear)
    .month(subjectMonth - 1)
    .date(subjectDay)
    .startOf("day");

  const today = now.startOf("day");

  const startTimeMinutes = PERIOD_START_TIMES[start - 1];
  const endTimeMinutes = PERIOD_END_TIMES[start + numberOfLessons - 2];
  const currentMinutes = now.hour() * 60 + now.minute();

  if (today.isBefore(subjectDate)) return 2; // Sắp tới
  if (today.isAfter(subjectDate)) return 0; // Đã hoàn thành

  // Cùng ngày
  if (currentMinutes < startTimeMinutes) return 2; // Sắp tới
  if (currentMinutes > endTimeMinutes) return 0; // Đã hoàn thành
  if (currentMinutes >= startTimeMinutes && currentMinutes <= endTimeMinutes)
    return 1; // Đang diễn ra

  return 0;
};
