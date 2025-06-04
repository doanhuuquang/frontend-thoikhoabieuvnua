import { Subject } from "@/lib/models/Schedule";
import { ScheduleItem } from "@/components/shared/schedule-item";

export default function ScheduleItemList({
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
