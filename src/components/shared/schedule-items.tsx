import { formatClassTime, getSubjectStatus } from "@/utils/scheduleUtils";
import { Subject } from "@/types/Schedule";

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

const statusColors = {
  inactive: "border-gray-300",
  active: "border-primary",
  incoming: "border-amber-400",
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
          ? `opacity-50 bg-background dark:bg-accent/50 dark:opacity-30 ${statusColors.inactive}`
          : subjectStatus == 1
          ? `bg-background dark:bg-accent ${statusColors.active}`
          : `bg-background dark:bg-accent ${statusColors.incoming}`
      }`}
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium w-[200px]">{subject.name}</h4>
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
            <AlertDialogTitle className="flex gap-2 items-start justify-between">
              <span className="w-[200px] text-start">{subject.name}</span>
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

export default function ScheduleItems({
  className,
  subjects,
}: {
  className: string;
  subjects: Subject[];
}) {
  if (!subjects?.length) {
    return (
      <div className={className}>
        <p className="text-gray-500 text-sm lg:text-start text-center">
          Yeahhhhh! Không có lịch học. Hãy tận dụng thời gian rảnh để tự học
          thêm kiến thức nhé
        </p>
      </div>
    );
  }

  const sortedSubjects = [...subjects].sort((a, b) =>
    a.start > b.start ? 1 : -1
  );

  return (
    <div className={`space-y-3 ${className}`}>
      {(sortedSubjects ?? subjects).map((subject) => (
        <ScheduleItem key={subject.code + subject.start} subject={subject} />
      ))}
    </div>
  );
}
