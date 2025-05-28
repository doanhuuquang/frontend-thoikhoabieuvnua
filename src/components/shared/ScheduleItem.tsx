import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  formatClassTime,
  getSubjectStatus,
} from "@/hooks/useScheduleCalculator";
import { Subject } from "@/lib/models/Schedule";

const borderColors = {
  incoming: "border-amber-400",
  active: "border-primary",
  inactive: "border-gray-300",
};

export const ScheduleItem = ({ subject }: { subject: Subject }) => {
  const subjectStatus = getSubjectStatus(
    subject.start,
    subject.numberOfLessons,
    subject.subjectDate
  );

  return (
    <div
      key={subject.code}
      className={`p-3 rounded-lg border-l-5 hover:cursor-pointer
      ${
        subjectStatus == 0
          ? `opacity-50 bg-background dark:bg-accent/50 dark:opacity-30 ${borderColors.inactive}`
          : subjectStatus == 1
          ? `bg-background dark:bg-accent ${borderColors.active}`
          : `bg-background dark:bg-accent ${borderColors.incoming}`
      }`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{subject.name}</h4>
              <p className="text-sm text-gray-500">
                Mã môn: {subject.code} - Nhóm {subject.group}
              </p>
              <p className="text-sm text-gray-500">Phòng: {subject.room}</p>
              <p className="text-sm text-gray-500">
                Giảng viên: {subject.lecturerName}
              </p>
            </div>
            <div className="text-right text-sm">
              <div className="font-medium">
                {formatClassTime(subject.start, subject.numberOfLessons)}
              </div>
              <div className="text-gray-500">
                Tiết {subject.start}-
                {subject.start + subject.numberOfLessons - 1}
              </div>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex gap-2 items-center justify-between">
              <span>{subject.name}</span>
              {subjectStatus == 0 ? (
                <span className="bg-gray-200 text-black px-2 py-1 text-xs rounded-full font-light">
                  Đã kết thúc
                </span>
              ) : subjectStatus == 1 ? (
                <span className="bg-green-400 text-black px-2 py-1 text-xs rounded-full font-normal">
                  Đang diễn ra
                </span>
              ) : (
                <span className="bg-amber-300 text-black px-2 py-1 text-xs rounded-full font-normal">
                  Chưa đến
                </span>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-start">
              <li className="text-sm text-gray-500">
                Mã môn: {subject.code} - Nhóm {subject.group}
              </li>
              <li className="text-sm text-gray-500">Phòng: {subject.room}</li>
              <li className="text-sm text-gray-500">
                Giảng viên: {subject.lecturerName}
              </li>
              <li className="text-sm text-gray-500">
                Tiết {subject.start}-
                {subject.start + subject.numberOfLessons - 1}
              </li>
              <li>
                thời gian tiết học diễn ra:{" "}
                <span className="font-bold text-primary">
                  {formatClassTime(subject.start, subject.numberOfLessons)}
                </span>
              </li>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ok</AlertDialogCancel>
            <AlertDialogAction>Ok nhưng là màu xanh</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
