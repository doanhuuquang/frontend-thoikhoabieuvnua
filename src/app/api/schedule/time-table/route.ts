import { NextResponse } from "next/server";
import { Browser, chromium, Page } from "playwright";
import { loginWeb } from "@/scraper/webScraper";
import { TimeTableSchedule } from "@/types/TimeTableSchedule";
import { fetchTimeTableSchedulesOnWeb } from "@/scraper/scheduleScraper";

export async function POST(request: Request) {
  let browser: Browser | null = null;
  let page: Page | null = null;

  try {
    const { studentCode, password } = await request.json();
    browser = await chromium.launch({ headless: false });
    page = (await loginWeb(browser, studentCode, password)).page;

    if (page) {
      const TimeTableSchedule: TimeTableSchedule[] =
        await fetchTimeTableSchedulesOnWeb(page);
      return NextResponse.json(TimeTableSchedule);
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } finally {
    browser?.close();
  }
}
