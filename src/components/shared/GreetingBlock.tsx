import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";
import { ScheduleData } from "@/data/ScheduleData";
import { UserData } from "@/data/UserData";

export default function GreetingBlock({ className }: { className?: string }) {
  const { getTodaySchedule } = useScheduleCalculator(ScheduleData);
  const numberOfLessons =
    getTodaySchedule()?.subjects?.reduce(
      (total, subject) => total + subject.numberOfLessons,
      0
    ) ?? 0;

  return (
    <div
      className={`flex flex-wrap gap-10 items-center justify-center p-4 bg-background dark:bg-accent rounded-md overflow-hidden ${className}`}
    >
      <div className="text-center lg-text-start md:text-start">
        <h2 className="text-2xl">Xin chào, {UserData.name}!</h2>
        <p className="text-gray-500">Hôm nay bạn thế nào rồi?</p>
        {numberOfLessons > 0 ? (
          <p className="text-sm text-gray-400 mt-2">
            Hôm nay bạn có
            <span className="text-primary font-bold"> {numberOfLessons} </span>
            tiết học, đừng cúp học đấy nhé!
          </p>
        ) : (
          <p className="text-sm text-gray-400 mt-2">
            Hôm nay bạn{" "}
            <span className="text-primary font-bold">
              không có tiết học nào{" "}
            </span>
          </p>
        )}

        <Button className="mt-5">Xem chi tiết lịch học hôm nay</Button>
      </div>
      <div className="grow flex justify-center">
        <Image
          alt="Greeting image"
          src={"/assets/images/children-preparing-their-backpack-bro.svg"}
          width={300}
          height={150}
          className="-mb-50"
        />
      </div>
    </div>
  );
}
