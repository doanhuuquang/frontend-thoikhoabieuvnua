import Cookies from "js-cookie";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!Cookies.get("token");
}
