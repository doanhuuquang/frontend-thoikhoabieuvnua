"use client";

import React, { createContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimeTableSchedule } from "@/types/TimeTableSchedule";
import {
  getTimeTableSchedulesFromLocalStorage,
  getTimeTableSemestersFromLocalStorage,
  getCurrentTimeTableSemesterFromLocalStorage,
  getCurrentTimeTableScheduleFromLocalStorage,
  getExamSchedulesFromStorage,
} from "@/utils/schedule-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSchedule } from "@/hooks/use-schedule";
import { toast } from "sonner";
import { ExamSchedule } from "@/types/ExamSchedule";

type ScheduleContextType = {
  timeTableSemesters: string[] | null;
  currentTimeTableSemester: string | null;
  timeTableSchedules: TimeTableSchedule[] | null;
  currentTimeTableSchedule: TimeTableSchedule | null;
  examSchedules: ExamSchedule[] | null;
  schedulesLoading: boolean;
  scheduleLoading: boolean;
  setSchedulesLoading: (loading: boolean) => void;
  fetchTimeTableSchedules: () => Promise<void>;
  fetchCurrentTimeTableSchedule: (
    semesterString: string,
    showToast: boolean
  ) => Promise<void>;
  fetchTimeTableSemesters: () => Promise<void>;
  fetchCurrentTimeTableSemester: (semester: string) => Promise<void>;
  fetchExamSchedules: () => Promise<void>;
  setOpenDialog: (open: boolean) => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  timeTableSemesters: null,
  currentTimeTableSemester: null,
  timeTableSchedules: null,
  currentTimeTableSchedule: null,
  examSchedules: null,
  schedulesLoading: true,
  scheduleLoading: true,
  setSchedulesLoading: () => {},
  fetchTimeTableSchedules: async () => {},
  fetchCurrentTimeTableSchedule: async () => {},
  fetchTimeTableSemesters: async () => {},
  fetchCurrentTimeTableSemester: async () => {},
  fetchExamSchedules: async () => {},
  setOpenDialog: () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  //////////////////////////////////////////////////////////////////////////////////
  const [timeTableSemesters, setTimeTableSemesters] = useState<string[] | null>(
    null
  );
  //////////////////////////////////////////////////////////////////////////////////
  const [currentTimeTableSemester, setCurrentTimeTableSemester] = useState<
    string | null
  >(null);
  //////////////////////////////////////////////////////////////////////////////////
  const [timeTableSchedules, setTimeTableSchedules] = useState<
    TimeTableSchedule[] | null
  >(null);
  //////////////////////////////////////////////////////////////////////////////////
  const [currentTimeTableSchedule, setCurrentTimeTableSchedule] =
    useState<TimeTableSchedule | null>(null);
  //////////////////////////////////////////////////////////////////////////////////
  const [examSchedules, setExamSchedules] = useState<ExamSchedule[] | null>(
    null
  );

  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setTimeTableSemesters(getTimeTableSemestersFromLocalStorage());
    setCurrentTimeTableSemester(getCurrentTimeTableSemesterFromLocalStorage());
    setTimeTableSchedules(getTimeTableSchedulesFromLocalStorage());
    setCurrentTimeTableSchedule(getCurrentTimeTableScheduleFromLocalStorage());
    setExamSchedules(getExamSchedulesFromStorage());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timeTableSemesters = getTimeTableSemestersFromLocalStorage();
    if (!timeTableSemesters) {
      fetchTimeTableSemesters();
    }

    const currentSemester = getCurrentTimeTableSemesterFromLocalStorage();
    if (currentSemester) {
      fetchCurrentTimeTableSemester(currentSemester);
      fetchCurrentTimeTableSchedule(currentSemester, false);
    }
  }, [mounted]);

  const fetchTimeTableSchedules = async () => {
    setSchedulesLoading(true);

    const localTimeTableSchedules = getTimeTableSchedulesFromLocalStorage();
    if (localTimeTableSchedules) {
      setTimeTableSchedules(localTimeTableSchedules);
    }

    setSchedulesLoading(false);
  };

  const fetchCurrentTimeTableSchedule = async (
    semesterString: string,
    showToast = false
  ) => {
    setScheduleLoading(true);

    const localCurrentTimeTableSchedule =
      getCurrentTimeTableScheduleFromLocalStorage();

    if (
      localCurrentTimeTableSchedule &&
      localCurrentTimeTableSchedule.semesterString === semesterString
    ) {
      setCurrentTimeTableSchedule(localCurrentTimeTableSchedule);
      setScheduleLoading(false);
      return;
    }

    const found = timeTableSchedules?.find(
      (timeTableSchedule) => timeTableSchedule.semesterString === semesterString
    );

    if (found) {
      setCurrentTimeTableSchedule(found);
      localStorage.setItem(
        "current-time-table-schedule",
        JSON.stringify(found)
      );

      if (showToast) {
        toast.success("Thành công", {
          duration: 3000,
          position: "top-center",
          description: `Thiết lập thời khóa biểu thành công cho học kỳ ${semesterString}`,
          action: {
            label: "Ẩn",
            onClick: () => console.log("Undo"),
          },
        });
      }
    }

    setScheduleLoading(false);
  };

  const fetchTimeTableSemesters = async () => {
    setScheduleLoading(true);

    const localTimeTableSemesters = getTimeTableSemestersFromLocalStorage();
    if (localTimeTableSemesters) {
      setTimeTableSemesters(localTimeTableSemesters);
      setScheduleLoading(false);
      return;
    }

    if (timeTableSchedules && timeTableSchedules.length > 0) {
      const timeTableSemsters = timeTableSchedules.map((s) => s.semesterString);
      setTimeTableSemesters(timeTableSemsters);
      localStorage.setItem(
        "time-table-semesters",
        JSON.stringify(timeTableSemsters)
      );
    } else {
      setTimeTableSemesters([]);
    }

    setScheduleLoading(false);
  };

  const fetchCurrentTimeTableSemester = async (semster: string) => {
    const localTimeTableSemesters = getTimeTableSemestersFromLocalStorage();
    const localCurrentTimeTableSemester =
      getCurrentTimeTableSemesterFromLocalStorage();

    if (
      localCurrentTimeTableSemester &&
      localCurrentTimeTableSemester === semster
    ) {
      setScheduleLoading(false);
      return;
    }

    if (localTimeTableSemesters == null || localTimeTableSemesters.length < 0) {
      setCurrentTimeTableSemester(null);
      setScheduleLoading(false);
      return;
    }

    if (localTimeTableSemesters?.includes(semster)) {
      setCurrentTimeTableSemester(semster);
      localStorage.setItem(
        "current-time-table-semester",
        JSON.stringify(semster)
      );
      setScheduleLoading(false);
    }
  };

  const fetchExamSchedules = async () => {
    setSchedulesLoading(true);
    const localExamSchedules = getExamSchedulesFromStorage();
    if (localExamSchedules && localExamSchedules.length > 0) {
      setExamSchedules(localExamSchedules);
    }
    setSchedulesLoading(false);
  };

  return (
    <ScheduleContext.Provider
      value={{
        timeTableSemesters,
        currentTimeTableSemester,
        timeTableSchedules,
        currentTimeTableSchedule,
        examSchedules,
        schedulesLoading,
        scheduleLoading,
        setSchedulesLoading,
        fetchTimeTableSchedules,
        fetchCurrentTimeTableSchedule,
        fetchTimeTableSemesters,
        fetchCurrentTimeTableSemester,
        fetchExamSchedules,
        setOpenDialog,
      }}
    >
      {schedulesLoading && timeTableSchedules == null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white z-50">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          <span>Đang tải dữ liệu, vui lòng chờ...</span>
        </div>
      )}

      <SelectSemesterDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />

      {children}
    </ScheduleContext.Provider>
  );
}

export function SelectSemesterDialog({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) {
  const {
    fetchCurrentTimeTableSemester,
    fetchCurrentTimeTableSchedule,
    timeTableSemesters,
    currentTimeTableSemester,
    currentTimeTableSchedule,
    scheduleLoading,
  } = useSchedule();

  const [value, setValue] = React.useState(currentTimeTableSemester ?? "");
  const [openPopover, setOpenPopover] = React.useState(false);

  React.useEffect(() => {
    setValue(currentTimeTableSemester ?? "");
    setOpenDialog(
      (timeTableSemesters?.length ?? 0) > 0 && !currentTimeTableSemester
    );
  }, [
    currentTimeTableSemester,
    currentTimeTableSchedule,
    timeTableSemesters,
    setOpenDialog,
  ]);

  const semestersPopover: { label: string; value: string }[] = (
    timeTableSemesters ?? []
  ).map((semester) => ({
    label: semester,
    value: semester,
  }));

  const handleSelectSemester = async () => {
    if (!value) return;
    await fetchCurrentTimeTableSemester(value);
    await fetchCurrentTimeTableSchedule(value, true);
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="sm:max-w-[425px]" isXButtonShow={false}>
        <DialogHeader>
          <DialogTitle>Chỉ còn 1 bước nữa thôi</DialogTitle>
          <DialogDescription>
            Để xem được thời khóa biểu, bạn vui lòng chọn học kỳ cần xem. Bạn có
            thể thay đổi tùy chọn này trong phần{" "}
            <span className="text-primary">Cài đặt</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Popover open={openPopover}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                  disabled={scheduleLoading}
                  onClick={() => setOpenPopover(!openPopover)}
                >
                  {semestersPopover.find((semester) => semester.value === value)
                    ?.label || "Chọn học kỳ"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {semestersPopover.map((semester) => (
                        <CommandItem
                          key={semester.value}
                          value={semester.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue);
                            setOpenPopover(!openPopover);
                          }}
                        >
                          {semester.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === semester.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => setOpenDialog(!openDialog)}
            >
              Để sau
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={scheduleLoading || !value}
            onClick={handleSelectSemester}
          >
            {scheduleLoading && (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            )}
            {scheduleLoading
              ? "Đang tải, vui lòng chờ.."
              : "Thiết lập thời khóa biểu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
