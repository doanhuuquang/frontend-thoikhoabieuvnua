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
import { isLoggedIn } from "@/utils/auth-utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSchedule } from "@/hooks/use-schedule";
import { toast } from "sonner";

type ScheduleContextType = {
  timeTableSemesters: string[] | null;
  currentTimeTableSemester: string | null;
  timeTableSchedules: TimeTableSchedule[] | null;
  currentTimeTableSchedule: TimeTableSchedule | null;
  schedulesLoading: boolean;
  scheduleLoading: boolean;
  setSchedulesLoading: (loading: boolean) => void;
  fetchTimeTableSchedules: () => Promise<void>;
  fetchCurrentTimeTableSchedule: (semesterString: string) => Promise<void>;
  fetchTimeTableSemesters: () => Promise<void>;
  fetchCurrentTimeTableSemester: (semester: string) => Promise<void>;
  openSemesterDialog: () => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  timeTableSemesters: null,
  currentTimeTableSemester: null,
  timeTableSchedules: null,
  currentTimeTableSchedule: null,
  schedulesLoading: true,
  scheduleLoading: true,
  setSchedulesLoading: () => {},
  fetchTimeTableSchedules: async () => {},
  fetchCurrentTimeTableSchedule: async () => {},
  fetchTimeTableSemesters: async () => {},
  fetchCurrentTimeTableSemester: async () => {},
  openSemesterDialog: () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  /////////////////////////////////////////////////////////////////////////////////////
  const [timeTableSemesters, setTimeTableSemesters] = useState<string[] | null>(
    getTimeTableSemestersFromLocalStorage()
  );
  /////////////////////////////////////////////////////////////////////////////////////
  const [currentTimeTableSemester, setCurrentTimeTableSemester] = useState<
    string | null
  >(getCurrentTimeTableSemesterFromLocalStorage());
  /////////////////////////////////////////////////////////////////////////////////////
  const [timeTableSchedules, setTimeTableSchedules] = useState<
    TimeTableSchedule[] | null
  >(getTimeTableSchedulesFromLocalStorage());
  /////////////////////////////////////////////////////////////////////////////////////
  const [currentTimeTableSchedule, setCurrentTimeTableSchedule] =
    useState<TimeTableSchedule | null>(
      getCurrentTimeTableScheduleFromLocalStorage()
    );
  /////////////////////////////////////////////////////////////////////////////////////
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const openSemesterDialog = () => setOpenDialog(true);

  const fetchTimeTableSchedules = async () => {
    setSchedulesLoading(true);

    const localTimeTableSchedules = getTimeTableSchedulesFromLocalStorage();
    if (localTimeTableSchedules) {
      setTimeTableSchedules(localTimeTableSchedules);
    }

    setSchedulesLoading(false);
  };

  const fetchCurrentTimeTableSchedule = async (semesterString: string) => {
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
        "current-time-table-Schedule",
        JSON.stringify(found)
      );
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
    const localTimeTableSemester =
      getCurrentTimeTableSemesterFromLocalStorage();

    if (localTimeTableSemester && localTimeTableSemester === semster) {
      setScheduleLoading(false);
      return;
    }
    if (localTimeTableSemesters == null || localTimeTableSemesters.length < 0) {
      setCurrentTimeTableSemester(null);
      setScheduleLoading(false);
      return;
    }
    if (localTimeTableSemester?.includes(semster)) {
      setCurrentTimeTableSemester(semster);
      localStorage.setItem(
        "current-time-table-semester",
        JSON.stringify(semster)
      );
      setScheduleLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchTimeTableSchedules();
  }, []);

  useEffect(() => {
    if (!timeTableSchedules || timeTableSchedules.length <= 0) return;
    fetchTimeTableSemesters();
  }, [timeTableSchedules]);

  useEffect(() => {
    if (!timeTableSemesters || timeTableSemesters.length <= 0) return;
    if (currentTimeTableSemester)
      fetchCurrentTimeTableSchedule(currentTimeTableSemester);
  }, [timeTableSemesters, currentTimeTableSemester]);

  return (
    <ScheduleContext.Provider
      value={{
        timeTableSemesters,
        currentTimeTableSemester,
        timeTableSchedules,
        currentTimeTableSchedule,
        schedulesLoading,
        scheduleLoading,
        setSchedulesLoading,
        fetchTimeTableSchedules,
        fetchCurrentTimeTableSchedule,
        fetchTimeTableSemesters,
        fetchCurrentTimeTableSemester,
        openSemesterDialog,
      }}
    >
      {schedulesLoading && timeTableSchedules == null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white z-50">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          <span>Đang tải danh sách học kỳ...</span>
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
    timeTableSemesters,
    currentTimeTableSemester,
    currentTimeTableSchedule,
    scheduleLoading,
  } = useSchedule();

  const [value, setValue] = React.useState(currentTimeTableSemester ?? "");

  React.useEffect(() => {
    setValue(currentTimeTableSemester ?? "");
    setOpenDialog(
      (timeTableSemesters?.length ?? 0) > 0 && !currentTimeTableSemester
    );
  }, [currentTimeTableSemester, currentTimeTableSchedule, timeTableSemesters]);

  const [openPopover, setOpenPopover] = React.useState(false);

  const semestersPopover: { label: string; value: string }[] = (
    timeTableSemesters ?? []
  ).map((semester) => ({
    label: semester,
    value: semester,
  }));

  const handleSelectSemester = async () => {
    if (!value) return;
    await fetchCurrentTimeTableSemester(value);
    setOpenDialog(false);
  };

  ///////////////////////////////////////////////////////////////////////////////
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
            <Button variant="outline">Để sau</Button>
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
