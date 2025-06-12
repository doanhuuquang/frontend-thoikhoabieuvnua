export interface Subject {
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
}

export interface Schedule {
  semesterString: string;
  semesterStartDate: string;
  timeTable: Record<string, Subject[]>;
}
