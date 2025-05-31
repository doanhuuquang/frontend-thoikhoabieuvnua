import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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
