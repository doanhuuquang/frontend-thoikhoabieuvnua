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

import { formatClassTime, isClassDoned } from "@/hooks/useScheduleCalculator";
import { Subject } from "@/lib/models/Schedule";

const borderColors = {
  active: "border-primary",
  inactive: "border-gray-300",
};

export const ScheduleItem = ({ subject }: { subject: Subject }) => {
  return (
    <div
      key={subject.code}
      className={`p-3 rounded-lg border-l-5 hover:cursor-pointer
      ${
        isClassDoned(
          subject.start,
          subject.numberOfLessons,
          subject.subjectDate
        )
          ? `opacity-50 bg-background dark:bg-accent/50 dark:opacity-30 ${borderColors.inactive}`
          : `bg-background dark:bg-accent ${borderColors.active}`
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
            <AlertDialogTitle>{subject.name}</AlertDialogTitle>
            <AlertDialogDescription>
              {isClassDoned(
                subject.start,
                subject.numberOfLessons,
                subject.subjectDate
              ) ? (
                "Tiết học này đã kết thúc rồi"
              ) : (
                <div>
                  <p className="text-sm text-gray-500">
                    Mã môn: {subject.code} - Nhóm {subject.group}
                  </p>
                  <p className="text-sm text-gray-500">Phòng: {subject.room}</p>
                  <p className="text-sm text-gray-500">
                    Giảng viên: {subject.lecturerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Tiết {subject.start}-
                    {subject.start + subject.numberOfLessons - 1}
                  </p>
                  <p>
                    thời gian tiết học diễn ra:{" "}
                    <span className="font-bold text-primary">
                      {formatClassTime(subject.start, subject.numberOfLessons)}
                    </span>
                  </p>
                </div>
              )}
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
