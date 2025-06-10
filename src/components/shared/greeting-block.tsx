"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScheduleData } from "@/data/ScheduleData";
import { useScheduleCalculator } from "@/hooks/use-schedule-calculator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/contexts/UserContext";

export default function GreetingBlock({ className }: { className?: string }) {
  const { user, loading } = useUser();

  const { getTodaySchedule } = useScheduleCalculator(ScheduleData);
  const numberOfLessons =
    getTodaySchedule().reduce(
      (total, subject) => total + subject.numberOfLessons,
      0
    ) ?? 0;

  return (
    <div
      className={cn(
        `min-h-[180px] flex flex-wrap gap-10 items-center justify-center p-4 bg-secondary rounded-md overflow-hidden text-secondary-foreground`,
        className
      )}
    >
      {/* Main content */}
      {loading ? (
        // Skeleton loading
        <div className="grow space-y-2 flex flex-col justify-between lg:h-full">
          <div className="space-y-2">
            <Skeleton className="h-7 w-full bg-blue-500" />
            <Skeleton className="h-4 w-[50%] bg-blue-500" />
          </div>
          <Skeleton className="h-5 w-[70%] bg-blue-500" />
        </div>
      ) : !user ? (
        // Chưa đăng nhập
        <div className="flex flex-col lg:items-start items-center grow text-center lg:text-start md:text-start">
          <div>
            <h2 className="text-2xl">Chào bạn sinh viên!</h2>
            <p className="text-secondary-foreground/80">
              Đăng nhập để tiếp tục sử dụng{" "}
              <span className="text-primary font-bold">Vnua Calendar</span> nhé!
            </p>
          </div>
          <Button className="mt-5 px-10 w-fit" asChild>
            <Link href={"/login"}>Đăng nhập</Link>
          </Button>
        </div>
      ) : (
        // Đã đăng nhập
        <div className="flex flex-col grow lg:items-start items-center text-center lg:text-start md:text-start">
          <h2 className="text-2xl">Xin chào, {user.name}!</h2>
          <p className="text-secondary-foreground/80">
            Hôm nay bạn thế nào rồi?
          </p>
          {numberOfLessons > 0 ? (
            <p className="text-sm text-secondary-foreground/80 ">
              Hôm nay bạn có
              <span className="text-primary font-bold">
                {" "}
                {numberOfLessons}{" "}
              </span>
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
      <div className="">
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
