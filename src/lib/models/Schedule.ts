export type Subject = {
  code: string;
  name: string;
  group: string;
  credit: number;
  classCode: string;
  start: number;
  numberOfLessons: number;
  room: string;
  lecturerName: string;
  subjectDate: string;
};

export type DailySchedule = {
  subjects: Subject[];
};

export type WeeklySchedule = {
  dailySchedules: Record<string, DailySchedule>;
};

export type Schedule = {
  semesterString: string;
  semesterStartDate: string;
  weeklySchedules: Record<string, WeeklySchedule>;
};
