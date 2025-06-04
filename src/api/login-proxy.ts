import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://thoikhoabieuvnua.up.railway.app/api/user/login",
    {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    }
  );
  const data = await response.json();
  res.status(response.status).json(data);
}
