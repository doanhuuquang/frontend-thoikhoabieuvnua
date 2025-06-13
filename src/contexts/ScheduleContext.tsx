"use client";

import React, { createContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Schedule } from "@/types/Schedule";

import {
  // isSemestersAvailable,
  // isScheduleAvailable,
  // getSemestersFromLocalStorage,
  getSchedulesFromLocalStorage,
  // fetchSchedules,
  // getCurrentSemesterFromLocalStorage,
  fetchSchedulesFromAPI,
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
  fetchSchedules: (password: string) => Promise<void>;
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
  fetchSchedules: async () => {},
  fetchCurrentSchedule: async () => {},
  fetchSemesters: async () => {},
  fetchCurrentSemester: async () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [semesters, setSemesters] = useState<string[] | null>(
    getSemestersFromLocalStorage()
  );
  const [currentSemester, setCurrentSemester] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(
    getCurrentScheduleFromLocalStorage()
  );
  const [schedulesLoading, setSchedulesLoading] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);

  const fetchSchedules = async (password: string) => {
    setSchedulesLoading(true);
    // Nếu chưa đăng nhập, xóa schedules và dừng lại
    if (!isLoggedIn()) {
      setSchedules(null);
      setSchedulesLoading(false);
      return;
    }

    // Nếu đã có schedules trong localStorage thì dùng luôn
    const localSchedules = getSchedulesFromLocalStorage();
    if (localSchedules) {
      setSchedules(localSchedules);
      setSchedulesLoading(false);
      return;
    }

    // Nếu chưa có localSchedules nhưng đã đăng nhập, lấy từ API
    try {
      const schedulesFromApi: Schedule[] = await fetchSchedulesFromAPI(
        password
      );
      setSchedules(schedulesFromApi);
      localStorage.setItem("schedules", JSON.stringify(schedulesFromApi));
      toast.success("Thành công", {
        description: "Đã tải xong thời khóa biểu",
        action: {
          label: "Ẩn",
          onClick: () => console.log("Undo"),
        },
        position: "top-center",
      });
    } catch {
      setSchedules(null);
    } finally {
      setSchedulesLoading(false);
    }
  };

  const fetchCurrentSchedule = async (semesterString: string) => {
    setScheduleLoading(true);

    // Nếu chưa đăng nhập, xóa current schedule và dừng lại
    if (!isLoggedIn()) {
      setCurrentSchedule(null);
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

    // Nếu chưa đăng nhập, xóa semesters và dừng lại
    if (!isLoggedIn()) {
      setSemesters(null);
      setScheduleLoading(false);
      return;
    }

    // Nếu đã có semesters trong localStorage thì dùng luôn
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
    // Nếu chưa đăng nhập, xóa current semester và dừng lại
    if (!isLoggedIn()) {
      setCurrentSemester(null);
      setScheduleLoading(false);
      return;
    }

    // Nếu đã có current semester trong localStorage thì dùng luôn
    const localCurrentSemester = getCurrentSemesterFromLocalStorage();
    if (localCurrentSemester && localCurrentSemester === semster) {
      setCurrentSemester(localCurrentSemester);
      setScheduleLoading(false);
      return;
    }

    const localSemesters = getSemestersFromLocalStorage();
    if (localSemesters == null || localSemesters.length < 0) {
      setCurrentSemester(null);
      setScheduleLoading(false);
    }

    if (localSemesters?.includes(semster)) {
      setCurrentSemester(semster);
      localStorage.setItem("currentSemester", JSON.stringify(semster));

      setScheduleLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules("");

    const handlerSchedules = async () => fetchSchedules("");
    const handlerSemesters = async () => fetchSemesters();

    window.addEventListener("semestersChanged", handlerSemesters);
    window.addEventListener("currentSemesterChanged", handlerSemesters);
    window.addEventListener("schedulesChanged", handlerSchedules);
    window.addEventListener("currentSchedulesChanged", handlerSchedules);

    window.addEventListener("storage", handlerSchedules);
    window.addEventListener("storage", handlerSemesters);
    return () => {
      window.removeEventListener("semestersChanged", handlerSemesters);
      window.removeEventListener("currentSemesterChanged", handlerSemesters);
      window.removeEventListener("schedulesChanged", handlerSchedules);
      window.removeEventListener("currentSchedulesChanged", handlerSchedules);

      window.removeEventListener("storage", handlerSchedules);
      window.removeEventListener("storage", handlerSemesters);
    };
  }, []);

  useEffect(() => {
    if (schedules && schedules.length > 0) {
      fetchSemesters();
    }
  }, [schedules]);

  useEffect(() => {
    if (semesters == null || semesters.length < 0) return;
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
        fetchSchedules,
        fetchCurrentSchedule,
        fetchSemesters,
        fetchCurrentSemester,
      }}
    >
      {schedulesLoading && schedules == null && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/60 z-50">
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
  React.useEffect(() => {
    setValue(currentSemester ?? "");
  }, [currentSemester]);

  const [openDialog, setOpenDialog] = React.useState(
    currentSchedule == null && (semesters?.length ?? 0) > 0
  );
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
