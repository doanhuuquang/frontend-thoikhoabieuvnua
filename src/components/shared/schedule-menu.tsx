"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ScheduleMenu() {
  const pathName = usePathname();

  return (
    <div className="p-3 top-0 flex items-center justify-between gap-3 bg-secondary/5 border border-secondary/10 rounded-md">
      <Button
        asChild
        className="grow"
        variant={pathName === "/schedule/today" ? "outline" : "ghost"}
      >
        <Link href="/schedule/today">Ngày</Link>
      </Button>
      <Button
        asChild
        className="grow"
        variant={pathName === "/schedule/weekly" ? "outline" : "ghost"}
      >
        <Link href="/schedule/weekly">Tuần</Link>
      </Button>
      <Button
        asChild
        className="grow"
        variant={pathName === "/schedule/monthly" ? "outline" : "ghost"}
      >
        <Link href="/schedule/monthly">Tháng</Link>
      </Button>
    </div>
  );
}
