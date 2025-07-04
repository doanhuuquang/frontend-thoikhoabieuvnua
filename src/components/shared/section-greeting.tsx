"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import { useSchedule } from "@/hooks/use-schedule";

enum Greetings {
  HowAreYouToday = "Hôm nay bạn thế nào rồi?",
  GoodMorning = "Chúc bạn một ngày mới tốt lành!",
  KeepGoing = "Cố lên nhé, mọi chuyện sẽ ổn thôi!",
  StayPositive = "Luôn giữ tinh thần tích cực nhé!",
  HaveAGreatDay = "Chúc bạn một ngày tuyệt vời!",
  Smile = "Đừng quên mỉm cười nhé!",
  TakeCare = "Nhớ giữ gìn sức khỏe!",
  BelieveInYourself = "Hãy tin vào bản thân mình!",
  NewOpportunities = "Hôm nay sẽ có nhiều cơ hội mới cho bạn!",
}

export default function GreetingSection({ className }: { className?: string }) {
  const { user, loading } = useUser();
  const { currentTimeTableSchedule } = useSchedule();
  const { getTodaySchedule } = useScheduleCalculator(currentTimeTableSchedule);
  const numberOfLessons =
    getTodaySchedule().reduce(
      (total, subject) => total + subject.numberOfLessons,
      0
    ) ?? 0;

  return (
    <div
      className={cn(
        `flex flex-wrap gap-10 items-center justify-center p-2 bg-linear-to-br from-secondary to-secondary overflow-hidden text-secondary-foreground rounded-lg shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)]`,
        className
      )}
    >
      {/* Main content */}
      {loading ? (
        // Skeleton loading
        <div className="grow space-y-2 flex flex-col justify-between lg:h-full">
          <div className="space-y-2">
            <Skeleton className="h-7 w-full bg-blue-500 dark:bg-blue-700" />
            <Skeleton className="h-4 w-[50%] bg-blue-500 dark:bg-blue-700" />
          </div>
          <Skeleton className="h-5 w-[70%] bg-blue-500 dark:bg-blue-700" />
        </div>
      ) : (
        <div className="grow flex flex-col items-center text-center lg:text-start md:text-start">
          <h2 className="text-2xl">Xin chào, {user?.name}!</h2>
          <p className="text-secondary-foreground/80">
            {
              Object.values(Greetings)[
                Math.floor(Math.random() * Object.values(Greetings).length)
              ]
            }
          </p>
          {numberOfLessons > 0 ? (
            <p className="text-sm text-secondary-foreground/80 ">
              Hôm nay bạn có
              <span className="text-primary font-bold">{numberOfLessons} </span>
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
      )}

      {/* Image */}
      <Image
        alt="Greeting image"
        src={"/assets/images/children-preparing-their-backpack-bro.svg"}
        width={300}
        height={150}
        className="-mb-50"
      />
    </div>
  );
}
