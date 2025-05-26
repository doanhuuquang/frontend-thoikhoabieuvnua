import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getVietnamDate = (): Date => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const vietnamTime = new Date(utc + 7 * 60 * 60 * 1000); // GMT+7
  return vietnamTime;
};
