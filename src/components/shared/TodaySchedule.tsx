import {
  useScheduleCalculator,
  formatClassTime,
  isClassHappening,
} from "@/hooks/useScheduleCalculator";

import { ScheduleData } from "@/data/ScheduleData";
import WeatherBlock from "@/components/shared/WeatherBlock";

const colors = [
  "border-red-500",
  "border-blue-500",
  "border-green-500",
  "border-yellow-500",
  "border-purple-500",
  "border-pink-500",
];

const getRandomBorderColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

const TodayScheduleItem = ({ className }: { className: string }) => {
  const { getTodaySchedule, getNextClass } =
    useScheduleCalculator(ScheduleData);
  const todayClasses = getTodaySchedule();
  const nextClass = getNextClass();

  if (!todayClasses?.subjects?.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        Hôm nay không có lịch học
        {nextClass && (
          <div className="mt-2 text-sm">
            Lớp tiếp theo: {nextClass.subject.name} -{" "}
            {nextClass.date.toLocaleDateString("vi-VN")}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {todayClasses.subjects.map((subject, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg border-l-5 ${getRandomBorderColor()} ${
            isClassHappening(subject.start, subject.numberOfLessons)
              ? "bg-background/50 opacity-50 dark:bg-accent/50 dark:opacity-70"
              : "bg-background dark:bg-accent"
          }`}
        >
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
        </div>
      ))}
    </div>
  );
};

export const TodaySchedule = () => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">Lịch học hôm nay</h3>
      <div className="grid grid-flow-row grid-rows-1 grid-cols-4 gap-3">
        <TodayScheduleItem className="lg:col-span-2 col-span-4" />
        <WeatherBlock className="lg:col-span-2 col-span-4" />
      </div>
      <div></div>
    </div>
  );
};
