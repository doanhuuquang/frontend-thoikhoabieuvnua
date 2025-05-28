import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getVietnamDate = (): dayjs.Dayjs => {
  return dayjs().tz("Asia/Ho_Chi_Minh");
};
