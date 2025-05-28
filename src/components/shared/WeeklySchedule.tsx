import WeekSelector from "@/components/shared/WeekSelector";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Ghost } from "lucide-react";
import { ScheduleData } from "@/data/ScheduleData";
import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";

const TodayScheduleItemList = ({ className }: { className: string }) => {
  const { getWeekSchedule } = useScheduleCalculator(ScheduleData);
  const weekClasses = getWeekSchedule(21);
};

export const WeeklySchedule = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h4 className="font-semibold text-lg">Lịch học theo tuần</h4>
        <WeekSelector className="lg:col-span-2 col-span-6" />
      </div>
      <div className="space-y-5 grid grid-flow-row grid-rows-1 grid-cols-6 gap-3"></div>
    </div>
  );
};
