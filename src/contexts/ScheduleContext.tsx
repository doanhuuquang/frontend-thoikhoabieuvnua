"use client";

import React, { createContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Schedule } from "@/types/Schedule";

import {
  getSchedulesFromLocalStorage,
  getSemestersFromLocalStorage,
  getCurrentSemesterFromLocalStorage,
  getCurrentScheduleFromLocalStorage,
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
  semesters: string[] | null;
  currentSemester: string | null;
  schedules: Schedule[] | null;
  currentSchedule: Schedule | null;
  schedulesLoading: boolean;
  scheduleLoading: boolean;
  setSchedulesLoading: (loading: boolean) => void;
  fetchSchedules: () => Promise<void>;
  fetchCurrentSchedule: (semesterString: string) => Promise<void>;
  fetchSemesters: () => Promise<void>;
  fetchCurrentSemester: (semester: string) => Promise<void>;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  semesters: null,
  currentSemester: null,
  schedules: null,
  currentSchedule: null,
  schedulesLoading: true,
  scheduleLoading: true,
  setSchedulesLoading: () => {},
  fetchSchedules: async () => {},
  fetchCurrentSchedule: async () => {},
  fetchSemesters: async () => {},
  fetchCurrentSemester: async () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [semesters, setSemesters] = useState<string[] | null>(
    getSemestersFromLocalStorage()
  );
  const [currentSemester, setCurrentSemester] = useState<string | null>(
    getCurrentSemesterFromLocalStorage()
  );
  const [schedules, setSchedules] = useState<Schedule[] | null>(
    getSchedulesFromLocalStorage()
  );
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(
    getCurrentScheduleFromLocalStorage()
  );
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const fetchSchedules = async () => {
    setSchedulesLoading(true);

    const localSchedules = getSchedulesFromLocalStorage();
    if (localSchedules) {
      setSchedules(localSchedules);
    }

    setSchedulesLoading(false);
  };

  const fetchCurrentSchedule = async (semesterString: string) => {
    setScheduleLoading(true);

    const localCurrentSchedule = getCurrentScheduleFromLocalStorage();
    if (
      localCurrentSchedule &&
      localCurrentSchedule.semesterString === semesterString
    ) {
      setCurrentSchedule(localCurrentSchedule);
      setScheduleLoading(false);
      return;
    }

    const found = schedules?.find(
      (schedule) => schedule.semesterString === semesterString
    );

    if (found) {
      setCurrentSchedule(found);
      localStorage.setItem("currentSchedule", JSON.stringify(found));
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

  const fetchSemesters = async () => {
    setScheduleLoading(true);

    const localSemesters = getSemestersFromLocalStorage();
    if (localSemesters) {
      setSemesters(localSemesters);
      setScheduleLoading(false);
      return;
    }

    if (schedules && schedules.length > 0) {
      const semsters = schedules.map((s) => s.semesterString);
      setSemesters(semsters);
      localStorage.setItem("semesters", JSON.stringify(semsters));
    } else {
      setSemesters([]);
    }
    setScheduleLoading(false);
  };

  const fetchCurrentSemester = async (semster: string) => {
    const localSemesters = getSemestersFromLocalStorage();
    const localCurrentSemester = getCurrentSemesterFromLocalStorage();

    if (localCurrentSemester && localCurrentSemester === semster) {
      setScheduleLoading(false);
      return;
    }
    if (localSemesters == null || localSemesters.length < 0) {
      setCurrentSemester(null);
      setScheduleLoading(false);
      return;
    }
    if (localSemesters?.includes(semster)) {
      setCurrentSemester(semster);
      localStorage.setItem("currentSemester", JSON.stringify(semster));
      setScheduleLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) return;
    fetchSchedules();
  }, []);

  useEffect(() => {
    if (!schedules || schedules.length <= 0) return;
    fetchSemesters();
  }, [schedules]);

  useEffect(() => {
    if (!semesters || semesters.length <= 0) return;
    if (currentSemester) fetchCurrentSchedule(currentSemester);
  }, [semesters, currentSemester]);

  return (
    <ScheduleContext.Provider
      value={{
        semesters,
        currentSemester,
        schedules,
        currentSchedule,
        schedulesLoading,
        scheduleLoading,
        setSchedulesLoading,
        fetchSchedules,
        fetchCurrentSchedule,
        fetchSemesters,
        fetchCurrentSemester,
      }}
    >
      {schedulesLoading && schedules == null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 text-white z-50">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          <span>Đang tải danh sách học kỳ...</span>
        </div>
      )}

      <SelectSemesterDialog />

      {children}
    </ScheduleContext.Provider>
  );
}

export function SelectSemesterDialog() {
  const {
    fetchCurrentSemester,
    semesters,
    currentSemester,
    currentSchedule,
    scheduleLoading,
  } = useSchedule();

  const [value, setValue] = React.useState(currentSemester ?? "");
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    setValue(currentSemester ?? "");
    setOpenDialog((semesters?.length ?? 0) > 0 && !currentSemester);
  }, [currentSemester, currentSchedule, semesters]);

  const [openPopover, setOpenPopover] = React.useState(false);

  const semestersPopover: { label: string; value: string }[] = (
    semesters ?? []
  ).map((semester) => ({
    label: semester,
    value: semester,
  }));

  const handleSelectSemester = async () => {
    if (!value) return;
    await fetchCurrentSemester(value);
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
