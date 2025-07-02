import * as cheerio from "cheerio";
import { Element } from "domhandler";
import { TimeTableSubject } from "@/types/TimeTableSchedule";

function parseHtmlToDocument(html: string): cheerio.CheerioAPI {
  return cheerio.load(html);
}

export function getTimeTable(
  html: string,
  semesterStartDate: string
): Record<string, TimeTableSubject[]> {
  const TimeTables = new Map<string, TimeTableSubject[]>();
  const document = parseHtmlToDocument(html);

  const table = document("tbody").first();
  const rows = table.find("tr").toArray();

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const cols = document(row)
      .find("td")
      .toArray()
      .filter((col) => !document(col).hasClass("d-none"));

    if (cols.length === 0) continue;

    const subject = getSubject(document, table, rowIndex);

    const weekString = document(cols[cols.length - 1]).text();

    const day = getDayOfWeek(document, table, rowIndex);

    if (day === null || !subject) continue;

    let weekCount = 1;
    for (const c of weekString) {
      if (/\d/.test(c)) {
        const weekStart = new Date(semesterStartDate);
        weekStart.setDate(weekStart.getDate() + (weekCount - 1) * 7);
        const subjectDate = getDateOfWeek(weekStart, day);

        const key = subjectDate.toISOString().slice(0, 10);
        if (!TimeTables.has(key)) TimeTables.set(key, []);
        const subjectCopy: TimeTableSubject = {
          code: subject.code,
          name: subject.name,
          group: subject.group,
          credit: subject.credit,
          classCode: subject.classCode,
          start: subject.start,
          numberOfLessons: subject.numberOfLessons,
          room: subject.room,
          lecturerName: subject.lecturerName,
          subjectDate: subjectDate.toISOString().slice(0, 10),
        };
        TimeTables.get(key)!.push(subjectCopy);
      }
      weekCount++;
    }
  }
  return Object.fromEntries(TimeTables);
}

function getDayOfWeek(
  document: cheerio.CheerioAPI,
  table: cheerio.Cheerio<Element>,
  rowIndex: number
): number | null {
  if (!table) return null;
  const row = table.find("tr").eq(rowIndex);
  const cols = row
    .find("td")
    .toArray()
    .filter((col) => !document(col).hasClass("d-none"));

  if (cols.length === 0) return null;

  let dayOfWeekStr: string;
  if (cols.length < 7) {
    dayOfWeekStr = document(cols[0]).text();
  } else {
    dayOfWeekStr = document(cols[5]).text();
  }

  return getDayOfWeekFromString(dayOfWeekStr);
}

function getSubject(
  document: cheerio.CheerioAPI,
  table: cheerio.Cheerio<Element>,
  rowIndex: number
): TimeTableSubject | null {
  try {
    const row = table.find("tr").eq(rowIndex);
    const cols = row
      .find("td")
      .toArray()
      .filter((col: Element) => !document(col).hasClass("d-none"));

    if (cols.length === 0) return null;

    const subject: TimeTableSubject = {
      code: "",
      name: "",
      group: "",
      credit: 0,
      classCode: "",
      start: 0,
      numberOfLessons: 0,
      room: "",
      lecturerName: "",
      subjectDate: "",
    };

    if (cols.length < 7 && rowIndex > 0) {
      for (let i = rowIndex - 1; i >= 0; i--) {
        const rowParent = table.find("tr").eq(i);
        const parentCols = rowParent
          .find("td")
          .toArray()
          .filter((col: Element) => !document(col).hasClass("d-none"));
        const hasRowspan = parentCols.some((td: Element) =>
          document(td).attr("rowspan")
        );
        if (hasRowspan && parentCols.length > 0) {
          subject.code = document(parentCols[0]).text().trim();
          subject.name = document(parentCols[1]).text().trim();
          subject.group = document(parentCols[2]).text().trim();
          subject.credit = safeParseInt(document(parentCols[3]).text().trim());
          subject.classCode = document(parentCols[4]).text().trim();
          break;
        }
      }
      if (cols.length > 4) {
        subject.start = safeParseInt(document(cols[1]).text().trim());
        subject.numberOfLessons = safeParseInt(document(cols[2]).text().trim());
        subject.room = document(cols[3]).text().trim();
        const lecturerName = document(cols[4]).text().trim();
        subject.lecturerName =
          lecturerName !== "" ? lecturerName : "Đang cập nhật";
      }
    } else if (cols.length >= 10) {
      subject.code = document(cols[0]).text().trim();
      subject.name = document(cols[1]).text().trim();
      subject.group = document(cols[2]).text().trim();
      subject.credit = safeParseInt(document(cols[3]).text().trim());
      subject.classCode = document(cols[4]).text().trim();
      subject.start = safeParseInt(document(cols[6]).text().trim());
      subject.numberOfLessons = safeParseInt(document(cols[7]).text().trim());
      subject.room = document(cols[8]).text().trim();
      const lecturerName = document(cols[9]).text().trim();
      subject.lecturerName =
        lecturerName !== "" ? lecturerName : "Đang cập nhật";
    }
    return subject;
  } catch {
    return null;
  }
}

function getDayOfWeekFromString(dayOfWeekStr: string): number | null {
  const s = dayOfWeekStr.trim().toUpperCase();
  if (s === "CN") return 0;
  if (s === "2") return 1;
  if (s === "3") return 2;
  if (s === "4") return 3;
  if (s === "5") return 4;
  if (s === "6") return 5;
  if (s === "7") return 6;
  return null;
}

function getDateOfWeek(weekStartDate: Date, dayOfWeek: number): Date {
  const result = new Date(weekStartDate);

  // Tính ngày đầu tuần (Thứ 2)
  const currentDayOfWeek = weekStartDate.getDay();
  const daysToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

  // Chuyển về Thứ 2
  result.setDate(result.getDate() + daysToMonday);

  // Thêm số ngày để đến ngày cần thiết
  const daysToAdd = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  result.setDate(result.getDate() + daysToAdd);

  return result;
}

function safeParseInt(value: string): number {
  const n = parseInt(value, 10);
  return isNaN(n) ? 0 : n;
}
