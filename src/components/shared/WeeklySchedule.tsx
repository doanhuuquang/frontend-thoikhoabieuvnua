import WeekSelector from "@/components/shared/WeekSelector";
import DayOfWeekSelector from "@/components/shared/WeekDaySelector";
// import { ScheduleData } from "@/data/ScheduleData";
// import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";

// const TodayScheduleItemList = ({ className }: { className: string }) => {
//   const { getWeekSchedule } = useScheduleCalculator(ScheduleData);
//   const weekClasses = getWeekSchedule(21);
// };

export const WeeklySchedule = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-semibold text-lg">Lịch học theo tuần</h4>
      </div>
      <div className="space-y-2">
        <WeekSelector className="w-full" />
        <DayOfWeekSelector className="w-full" />
      </div>
    </div>
  );
};
