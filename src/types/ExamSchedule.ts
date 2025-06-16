export interface ExamSubject {
  code: string; // Mã môn học
  name: string; // Tên môn học
  examGroup: string; // Ghép thi
  examGroupNumber: number; // Tổ thi
  numberOfStudents: number; // Sĩ số
  examDate: string; // Ngày thi
  examRoom: string; // Phòng thi
  start: number; // Tiết bắt đầu thi
  numberOfLessons: number; // Số tiết thi
  note: string; // Ghi chú
}

export interface ExamSchedule {
  semesterString: string;
  schedule: ExamSubject[];
}
