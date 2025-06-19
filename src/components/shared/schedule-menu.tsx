"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ScheduleMenuItem({
  pathName,
  href,
  name,
}: {
  pathName: string;
  href: string;
  name: string;
}) {
  return (
    <Button
      asChild
      className={
        pathName === href
          ? "grow bg-primary text-primary-foreground"
          : "grow hover:bg-primary/5"
      }
      variant={pathName === href ? "default" : "ghost"}
    >
      <Link href={href}>{name}</Link>
    </Button>
  );
}

export default function ScheduleMenu() {
  const pathName = usePathname();

  return (
    <div className="p-3 top-0 flex items-center justify-between gap-3 bg-primary/5 border border-primary/10 rounded-md">
      <ScheduleMenuItem
        pathName={pathName}
        href="/schedule/today"
        name="Ngày"
      />
      <ScheduleMenuItem
        pathName={pathName}
        href="/schedule/weekly"
        name="Tuần"
      />
      <ScheduleMenuItem
        pathName={pathName}
        href="/schedule/monthly"
        name="Tháng"
      />
    </div>
  );
}
