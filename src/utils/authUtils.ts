import { User } from "@/lib/models/User";
import Cookies from "js-cookie";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!Cookies.get("token");
}

export async function login({
  studentCode,
  password,
}: {
  studentCode: string;
  password: string;
}) {
  let res;
  try {
    res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentCode, password }),
    });
  } catch {
    throw new Error("Không có kết nối mạng");
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok)
    throw new Error(data.message || "Có lỗi xảy ra, vui lòng thử lại sau");
  if (data.token) {
    Cookies.set("token", data.token, { expires: 30, path: "/" });
  }
  return data;
}

export async function logout() {
  Cookies.remove("token", { path: "/" });
  localStorage.removeItem("userProfile");
  console.log(localStorage.getItem("userProfile") || "Đã xóa thông tin user");
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
