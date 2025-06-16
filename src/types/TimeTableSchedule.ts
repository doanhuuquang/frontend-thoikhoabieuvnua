export interface TimeTableSubject {
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

export interface TimeTableSchedule {
  semesterString: string;
  semesterStartDate: string;
  schedule: Record<string, TimeTableSubject[]>;
}
