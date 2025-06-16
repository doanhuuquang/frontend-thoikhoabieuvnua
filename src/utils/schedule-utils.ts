import { TimeTableSchedule } from "@/types/TimeTableSchedule";
import Cookies from "js-cookie";

const API_URL = "https://thoikhoabieuvnua.up.railway.app";

export async function fetchTimeTableSchedulesFromAPI(
  password: string
): Promise<TimeTableSchedule[]> {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Chưa đăng nhập");
  }

  const res = await fetch(`${API_URL}/api/schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Lấy danh sách lịch học thất bại");
  }
  localStorage.setItem("time-table-schedules", JSON.stringify(data));
  return data;
}

export function getTimeTableSemestersFromLocalStorage() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("time-table-semesters");
  if (!data) return null;
  try {
    return JSON.parse(data) as string[];
  } catch {
    return null;
  }
}

export function getCurrentTimeTableSemesterFromLocalStorage() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("current-time-table-semester");
  if (!data) return null;
  try {
    return JSON.parse(data) as string;
  } catch {
    return null;
  }
}

export function getTimeTableSchedulesFromLocalStorage() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("time-table-schedules");
  if (!data) return null;
  try {
    return JSON.parse(data) as TimeTableSchedule[];
  } catch {
    return null;
  }
}

export function getCurrentTimeTableScheduleFromLocalStorage(): TimeTableSchedule | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("current-time-table-Schedule");
  if (!data) return null;
  try {
    return JSON.parse(data) as TimeTableSchedule;
  } catch {
    return null;
  }
}
