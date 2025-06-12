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

type ScheduleContextType = {
  semesters: string[] | null;
  currentSemester: string | null;
  schedules: Schedule[] | null;
  currentSchedule: Schedule | null;
  scheduleLoading: boolean;
  refreshSemesters: (password: string) => Promise<void>;
  refreshCurrentSemester: (semester: string) => Promise<void>;
  fetchSchedules: (password: string) => Promise<void>;
  refreshSchedules: (password: string, semesterString: string) => Promise<void>;
  refreshCurrentSchedule: (semesterString: string) => Promise<void>;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  semesters: null,
  currentSemester: null,
  schedules: null,
  currentSchedule: null,
  scheduleLoading: true,
  refreshSemesters: async () => {},
  refreshCurrentSemester: async () => {},
  fetchSchedules: async () => {},
  refreshSchedules: async () => {},
  refreshCurrentSchedule: async () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [semesters] = useState<string[] | null>(null);
  const [currentSemester] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);
  const [currentSchedule] = useState<Schedule | null>(null);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  const fetchSchedules = async (password: string) => {
    setScheduleLoading(true);
    // Nếu chưa đăng nhập, xóa schedules và dừng lại
    if (!isLoggedIn()) {
      setSchedules(null);
      setScheduleLoading(false);
      return;
    }

    // Nếu đã có schedules trong localStorage thì dùng luôn
    const localSchedules = getSchedulesFromLocalStorage();
    if (localSchedules) {
      setSchedules(localSchedules);
      setScheduleLoading(false);
      return;
    }

    // Nếu chưa có localSchedules nhưng đã đăng nhập, lấy từ API
    try {
      const schedulesFromApi: Schedule[] = await fetchSchedulesFromAPI(
        password
      );
      setSchedules(schedulesFromApi);
      localStorage.setItem("schedules", JSON.stringify(schedulesFromApi));
    } catch {
      setSchedules(null);
    } finally {
      setScheduleLoading(false);
    }
  };

  // const refreshSemesters = async (semesters: string[]) => {
  //   setLoading(true);

  //   const localSemesters = getSemestersFromLocalStorage();
  //   if (localSemesters) {
  //     setSemesters(localSemesters);
  //     setLoading(false);
  //     return;
  //   } else {
  //     setSemesters(semesters);
  //     localStorage.setItem("semesters", JSON.stringify([semesters]));
  //   }
  // };

  // const refreshCurrentSemester = async (semester: string) => {
  //   setLoading(true);

  //   const localCurrentSemester = getCurrentSemesterFromLocalStorage();
  //   if (localCurrentSemester) {
  //     setCurrentSemester(localCurrentSemester);
  //     setLoading(false);
  //     return;
  //   } else {
  //     setCurrentSemester(semester);
  //     localStorage.setItem("currentSemester", JSON.stringify(semester));
  //   }
  // };

  // const refreshSchedules = async (password: string) => {
  //   setLoading(true);

  //   const localSchedules = getSchedulesFromLocalStorage();
  //   if (localSchedules) {
  //     setSchedules(localSchedules);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const fetchedSchedules: Schedule[] = await fetchSchedules(password);

  //     const semester: string[] = [];
  //     for (const schedule of fetchedSchedules) {
  //       semester.push(schedule.semesterString);
  //     }
  //     refreshSemesters(semester);

  //     setSchedules(fetchedSchedules);
  //     localStorage.setItem("schedules", JSON.stringify(fetchedSchedules));
  //   } catch (error) {
  //     setSchedules(null);
  //     throw new Error(
  //       "Lỗi khi lấy thời khóa biểu: " +
  //         (error instanceof Error ? error.message : "Không xác định")
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const refreshCurrentSchedule = async (semesterString: string) => {
  //   setLoading(true);
  //   const localSchedules = getSchedulesFromLocalStorage();
  //   if (localSchedules) {
  //     const schedule = localSchedules.find(
  //       (s) => s.semesterString === semesterString
  //     );
  //     if (schedule) {
  //       setCurentSchedule(schedule);
  //       setLoading(false);
  //       return;
  //     }
  //   } else {
  //     setCurentSchedule(null);
  //     setLoading(false);
  //     return;
  //   }
  // };

  useEffect(() => {
    fetchSchedules("");
    const handler = async () => fetchSchedules("");

    window.addEventListener("semestersChanged", handler);
    window.addEventListener("currentSemesterChanged", handler);
    window.addEventListener("schedulesChanged", handler);
    window.addEventListener("currentSchedulesChanged", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("semestersChanged", handler);
      window.removeEventListener("currentSemesterChanged", handler);
      window.removeEventListener("schedulesChanged", handler);
      window.removeEventListener("currentSchedulesChanged", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        semesters,
        currentSemester,
        schedules,
        currentSchedule,
        scheduleLoading,
        refreshSemesters: async () => {},
        refreshCurrentSemester: async () => {},
        fetchSchedules,
        refreshSchedules: async () => {},
        refreshCurrentSchedule: async () => {},
      }}
    >
      <SelectSemesterDialog
        isCurrentScheduleAvailable={currentSchedule != null}
        isLoggedIn={isLoggedIn()}
        semestersFromLocalStorage={semesters || []}
        scheduleLoading={scheduleLoading}
      />

      {children}
    </ScheduleContext.Provider>
  );
}

export function SelectSemesterDialog({
  isCurrentScheduleAvailable,
  isLoggedIn,
  semestersFromLocalStorage,
  scheduleLoading,
}: {
  isCurrentScheduleAvailable: boolean;
  isLoggedIn: boolean;
  semestersFromLocalStorage: string[];
  scheduleLoading: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const semesters: { label: string; value: string }[] = [];
  for (const semester of semestersFromLocalStorage) {
    const label = semester;
    const value = semester;
    semesters.push({ label, value });
  }

  ///////////////////////////////////////////////////////////////////////
  if (!isLoggedIn || isCurrentScheduleAvailable) return null;

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]" isXButtonShow={false}>
        <DialogHeader>
          <DialogTitle>Chỉ còn 1 bước nữa thôi</DialogTitle>
          <DialogDescription>
            Để xem được thời khóa biểu, bạn vui lòng chọn học kỳ cần xem. Bạn có
            thể thay đổi tùy chọn này trong phần Cài đặt.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            {/* //////////////////////////////////////////////////////////////// */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                  disabled={scheduleLoading}
                >
                  {value
                    ? semesters.find((semester) => semester.value === value)
                        ?.label
                    : scheduleLoading
                    ? "Đang tải danh sách học kỳ..."
                    : "Chọn học kỳ"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="width-full">
                  <CommandList>
                    <CommandGroup>
                      {semesters.map((semester) => (
                        <CommandItem
                          key={semester.value}
                          value={semester.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
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
          <Button type="submit" disabled={scheduleLoading}>
            {scheduleLoading && (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            )}
            {scheduleLoading
              ? "Đang tải, vui lòng chờ.."
              : "Xem thời khóa biểu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
