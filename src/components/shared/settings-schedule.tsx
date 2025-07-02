"use client";

import { Button } from "@/components/ui/button";
import { useSchedule } from "@/hooks/use-schedule";

export default function SettingsSchedule() {
  const { setOpenDialog, currentTimeTableSemester } = useSchedule();

  return (
    <div className="space-y-3 rounded-md bg-background dark:bg-sidebar ">
      <div className="w-full px-2 pt-3 pb-1.5 space-y-2">
        <h4 className="text-lg font-bold">Thời khóa biểu</h4>
        <p className="text-sm text-muted-foreground">
          Thay đổi học kỳ để xem thời khóa biểu tại đây
        </p>
      </div>
      <div className="w-full h-[1px] bg-muted"></div>
      <div className="flex items-center justify-between gap-3 px-2 pb-3 pt-1.5">
        <p className="text-sm text-muted-foreground">
          Hiện tại: {currentTimeTableSemester || "Chưa chọn học kỳ"}
        </p>

        <Button variant={"outline"} onClick={() => setOpenDialog(true)}>
          Chọn học kỳ
        </Button>
      </div>
    </div>
  );
}
