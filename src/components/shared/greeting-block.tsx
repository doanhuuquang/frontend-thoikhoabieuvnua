import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScheduleData } from "@/data/ScheduleData";
import { UserData } from "@/data/UserData";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function GreetingBlock({ className }: { className?: string }) {
  const { getTodaySchedule } = useScheduleCalculator(ScheduleData);
  const numberOfLessons =
    getTodaySchedule().reduce(
      (total, subject) => total + subject.numberOfLessons,
      0
    ) ?? 0;

  return (
    <div
      className={cn(
        `flex flex-wrap gap-10 items-center justify-center p-4 bg-secondary rounded-md overflow-hidden text-secondary-foreground`,
        className
      )}
    >
      <div className="text-center lg-text-start md:text-start">
        <h2 className="text-2xl">Xin chào, {UserData.name}!</h2>
        <p className="text-secondary-foreground/80">Hôm nay bạn thế nào rồi?</p>
        {numberOfLessons > 0 ? (
          <p className="text-sm text-secondary-foreground/80">
            Hôm nay bạn có
            <span className="text-primary font-bold"> {numberOfLessons} </span>
            tiết học, đừng cúp học đấy nhé!
          </p>
        ) : (
          <p className="text-sm text-secondary-foreground/80">
            Hôm nay bạn{" "}
            <span className="text-primary font-bold">
              không có tiết học nào{" "}
            </span>
          </p>
        )}

        <Button className="mt-5" asChild>
          <Link href={"/schedule/today"}>
            Xem chi tiết lịch học hôm nay
            <ArrowUpRight />
          </Link>
        </Button>
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
