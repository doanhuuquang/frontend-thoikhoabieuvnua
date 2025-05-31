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

export type Schedule = {
  semesterString: string;
  semesterStartDate: string;
  schedules: Record<string, Subject[]>;
};
