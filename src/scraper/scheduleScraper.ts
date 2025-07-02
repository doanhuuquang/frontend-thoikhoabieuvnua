import { TimeTableSchedule } from "@/types/TimeTableSchedule";
import { Page } from "playwright-core";
import { getTimeTable } from "@/scraper/timeTableScheduleParse";

const LINK_BUTTON_TKB_TUAN =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[2]/app-right/app-chucnang/div/div[2]/ul[9]/li/div[1]/a[1]";
const LINK_BUTTON_TKB_HK =
  "/html/body/app-root/div/div/div/div[1]/div/div/div[2]/app-right/app-chucnang/div/div[2]/ul[10]/li/div[1]/a[1]";
///////////////////////////////////////////////////////////////////////////////////
const WEEK_COMBO_BOX_XPATH =
  '//*[@id="fullScreen"]/div[2]/div[2]/div[1]/ng-select';
const SEMESTER_COMBO_BOX_TUAN_XPATH =
  "/html/body/app-root[1]/div/div/div/div[1]/div/div/div[1]/app-thoikhoabieu-tuan/div[1]/div[2]/div[1]/div[1]/ng-select/div/div";
const SEMESTER_COMBO_BOX_HK_XPATH =
  "/html/body/app-root[1]/div/div/div/div[1]/div/div/div[1]/app-tkb-hocky/div/div[2]/div[1]/div/ng-select/div";
const DROP_DOWN_ITEM_SELECTOR = ".ng-option";
////////////////////////////////////////////////////////////////////////////////////
const TIMEOUT = 10000;
const SHORT_TIMEOUT = 2000;

export async function fetchTimeTableSchedulesOnWeb(
  page: Page
): Promise<TimeTableSchedule[]> {
  const timeTableSchedules: TimeTableSchedule[] = [];

  try {
    await page.waitForSelector(`xpath=${LINK_BUTTON_TKB_TUAN}`, {
      timeout: TIMEOUT,
    });
    await page.click(`xpath=${LINK_BUTTON_TKB_TUAN}`);

    const semesters: string[] = await fetchSemesterNames(
      page,
      SEMESTER_COMBO_BOX_TUAN_XPATH
    );
    let timeTableSchedule: TimeTableSchedule;

    for (const semester of semesters.slice(0, 4)) {
      timeTableSchedule = {
        semesterString: semester,
        semesterStartDate: (await fetchStartDateOfTerm(page, semester)) || "",
        schedule: {},
      };

      const html = await fetchTimeTableTable(page, semester);
      console.log(html);

      const timeTable = getTimeTable(html, timeTableSchedule.semesterStartDate);
      timeTableSchedule.schedule = timeTable;

      timeTableSchedules.push(timeTableSchedule);
    }

    return timeTableSchedules;
  } catch {
    throw new Error("Không thể lấy thông tin thời khóa biểu");
  }
}

async function fetchSemesterNames(
  page: Page,
  semesterComboBoxXpath: string
): Promise<string[]> {
  try {
    await page.click(`xpath=${semesterComboBoxXpath}`, {
      timeout: TIMEOUT,
    });

    const semesterElements = await page.$$(DROP_DOWN_ITEM_SELECTOR);
    if (semesterElements.length === 0) {
      throw new Error("Không tìm thấy học kỳ");
    }

    const semesterNames: string[] = [];
    for (const element of semesterElements) {
      const text = (await element.innerText()).trim();
      semesterNames.push(text);
    }

    return semesterNames;
  } catch {
    throw new Error("Không thể lấy danh sách học kỳ");
  }
}

async function fetchStartDateOfTerm(
  page: Page,
  semester: string
): Promise<string | null> {
  try {
    await page.waitForSelector(`xpath=${LINK_BUTTON_TKB_TUAN}`, {
      timeout: TIMEOUT,
    });
    await page.click(`xpath=${LINK_BUTTON_TKB_TUAN}`);

    if (semester) {
      await page.click(`xpath=${SEMESTER_COMBO_BOX_TUAN_XPATH}`, {
        timeout: TIMEOUT,
      });

      const semesterList = await page.$$(DROP_DOWN_ITEM_SELECTOR);
      for (const element of semesterList) {
        const text = (await element.innerText()).trim();
        if (semester.toLowerCase() === text.toLowerCase()) {
          await element.click();
          await page.waitForLoadState("networkidle");
          break;
        }
      }
    }

    await page.waitForTimeout(SHORT_TIMEOUT);
    await page.click(`xpath=${WEEK_COMBO_BOX_XPATH}`);

    const weeks = await page.$$(DROP_DOWN_ITEM_SELECTOR);
    if (weeks.length === 0)
      throw new Error("Không tìm thấy tuần học nào trong combo box");

    const firstWeek = weeks[0];
    const weekId = await firstWeek.getAttribute("id");
    if (!weekId || !weekId.includes("-"))
      throw new Error("ID tuần học không hợp lệ: " + weekId);

    const weekNumber = parseInt(weekId.split("-")[1]) + 1;
    const weekText = await firstWeek.innerText();
    const currentWeekDate = parseStringToDate(weekText);
    if (!currentWeekDate)
      throw new Error("Không thể phân tích ngày từ: " + weekText);

    const result = new Date(currentWeekDate);
    result.setDate(result.getDate() - (weekNumber - 1) * 7);

    const yyyy = result.getFullYear();
    const mm = String(result.getMonth() + 1).padStart(2, "0");
    const dd = String(result.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    throw new Error("Không thể lấy ngày bắt đầu học kỳ");
  }
}

function parseStringToDate(dateString: string): Date | null {
  if (!dateString || !dateString.includes("[")) return null;
  const startIndex = dateString.indexOf("[");
  const endIndex = dateString.indexOf("]");
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex)
    return null;
  const insideBrackets = dateString.substring(startIndex + 1, endIndex);
  for (const part of insideBrackets.split(" ")) {
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(part)) {
      const [day, month, year] = part.split("/").map(Number);
      return new Date(year, month - 1, day);
    }
  }
  return null;
}

async function fetchTimeTableTable(
  page: Page,
  semester: string
): Promise<string> {
  try {
    await page.waitForSelector(`xpath=${LINK_BUTTON_TKB_HK}`, {
      timeout: TIMEOUT,
    });
    await page.click(`xpath=${LINK_BUTTON_TKB_HK}`);

    if (semester) {
      await page.click(`xpath=${SEMESTER_COMBO_BOX_HK_XPATH}`, {
        timeout: TIMEOUT,
      });

      const semesterList = await page.$$(DROP_DOWN_ITEM_SELECTOR);
      for (const element of semesterList) {
        const text = (await element.innerText()).trim();
        if (semester.toLowerCase() === text.toLowerCase()) {
          await element.click();
          await page.waitForTimeout(SHORT_TIMEOUT);
          await page.waitForLoadState("networkidle");
          break;
        }
      }
    }

    return await page.content();
  } catch {
    throw new Error("Không thể lấy bảng thời khóa biểu");
  }
}
