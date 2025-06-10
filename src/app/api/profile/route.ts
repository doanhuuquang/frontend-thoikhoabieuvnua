import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
  }

  const response = await fetch(
    "https://thoikhoabieuvnua.up.railway.app/api/user/profile",
    {
      method: "GET",
      headers: { Authorization: authorization },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
