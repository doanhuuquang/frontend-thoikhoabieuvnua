import { Schedule } from "@/types/Schedule";
import Cookies from "js-cookie";

const API_URL = "https://thoikhoabieuvnua.up.railway.app";

export async function fetchSchedulesFromAPI(
  password: string
): Promise<Schedule[]> {
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
  localStorage.setItem("schedules", JSON.stringify(data));
  return data;
}

export function getSemestersFromLocalStorage() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("semesters");
  if (!data) return null;
  try {
    return JSON.parse(data) as string[];
  } catch {
    return null;
  }
}

export function getCurrentSemesterFromLocalStorage() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("currentSemester");
  if (!data) return null;
  try {
    return JSON.parse(data) as string;
  } catch {
    return null;
  }
}

export function getSchedulesFromLocalStorage(): Schedule[] | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("schedules");
  if (!data) return null;
  try {
    return JSON.parse(data) as Schedule[];
  } catch {
    return null;
  }
}

export function getCurrentScheduleFromLocalStorage(): Schedule | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("currentSchedule");
  if (!data) return null;
  try {
    return JSON.parse(data) as Schedule;
  } catch {
    return null;
  }
}
