import { User } from "@/types/User";
import Cookies from "js-cookie";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!Cookies.get("token");
}

const API_URL = "https://thoikhoabieuvnua.up.railway.app";

export async function auth(studentCode: string, password: string) {
  const res = await fetch(`${API_URL}/api/user/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentCode, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Đăng nhập thất bại");
  }
  Cookies.set("token", data.token, { expires: 30, path: "/" });
  return data;
}

export async function logout() {
  Cookies.remove("token", { path: "/" });
  localStorage.removeItem("userProfile");
  localStorage.removeItem("schedules");
  localStorage.removeItem("currentSchedule");
  localStorage.removeItem("semesters");
  localStorage.removeItem("currentSemester");
  return true;
}

export async function getUserProfileFromDb() {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Chưa đăng nhập");
  }
  const res = await fetch("/api/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Lấy thông tin thất bại");
  console.log("Lấy thông tin user thành công", data);
  return data;
}

export function getUserProfileFromLocalStorage(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("userProfile");
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}
