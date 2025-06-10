import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Nếu đã đăng nhập mà vào /login thì redirect về trang chủ
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const protectedPaths = ["/profile", "/schedule", "/settings", "/profile"];
  if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/schedule/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
