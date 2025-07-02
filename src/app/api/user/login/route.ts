import { NextResponse } from "next/server";
import { Browser, chromium, Page } from "playwright";
import { loginWeb } from "@/scraper/webScraper";
import { fetchStudentInfoOnWeb } from "@/scraper/studentScraper";
import { User } from "@/types/User";

export async function POST(request: Request) {
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    const { studentCode, password } = await request.json();
    browser = await chromium.launch({ headless: false });
    page = (await loginWeb(browser, studentCode, password)).page;

    if (page) {
      const userInfo: User = await fetchStudentInfoOnWeb(page);
      userInfo.password = password;
      return NextResponse.json(userInfo);
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } finally {
    browser?.close();
  }
}
