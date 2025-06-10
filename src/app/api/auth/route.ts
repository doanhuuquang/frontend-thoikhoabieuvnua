import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // gọi endpoint đăng ký tài khoản
  let response = await fetch(
    "https://thoikhoabieuvnua.up.railway.app/api/user/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  // Nếu chưa có tài khoản trong db && thông tin đăng nhập là đúng -> đăng ký -> true
  if (response.ok) {
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  }

  // Nếu đã có tài khoản trong db || thông tin đăng nhập là sai -> false
  // Nếu đã có thông tin trong db -> vào endpoin này đề check thông tin tài khoản trong db
  response = await fetch(
    "https://thoikhoabieuvnua.up.railway.app/api/user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
