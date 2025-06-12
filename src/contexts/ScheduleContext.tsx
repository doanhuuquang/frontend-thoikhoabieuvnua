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

type ScheduleContextType = {
  semesters: string[] | null;
  currentSemester: string | null;
  schedules: Schedule[] | null;
  currentSchedule: Schedule | null;
  schedulesLoading: boolean;
  scheduleLoading: boolean;
  refreshSemesters: (password: string) => Promise<void>;
  refreshCurrentSemester: (semester: string) => Promise<void>;
  refreshSchedules: (password: string, semesterString: string) => Promise<void>;
  refreshCurrentSchedule: (semesterString: string) => Promise<void>;
  fetchSchedules: (password: string) => Promise<void>;
  fetchSemesters: () => Promise<void>;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  semesters: null,
  currentSemester: null,
  schedules: null,
  currentSchedule: null,
  schedulesLoading: true,
  scheduleLoading: true,
  refreshSemesters: async () => {},
  refreshCurrentSemester: async () => {},
  refreshSchedules: async () => {},
  refreshCurrentSchedule: async () => {},
  fetchSchedules: async () => {},
  fetchSemesters: async () => {},
});

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [semesters, setSemesters] = useState<string[] | null>(null);
  const [currentSemester] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);
  const [currentSchedule] = useState<Schedule | null>(null);
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
    } catch {
      setSchedules(null);
    } finally {
      setSchedulesLoading(false);
    }
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

  return (
    <ScheduleContext.Provider
      value={{
        semesters,
        currentSemester,
        schedules,
        currentSchedule,
        schedulesLoading,
        scheduleLoading,
        refreshSemesters: async () => {},
        refreshCurrentSemester: async () => {},
        refreshSchedules: async () => {},
        refreshCurrentSchedule: async () => {},
        fetchSchedules,
        fetchSemesters,
      }}
    >
      {schedulesLoading && schedules == null && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/60 z-50">
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          <span>Đang tải danh sách học kỳ...</span>
        </div>
      )}

      <SelectSemesterDialog
        isCurrentScheduleAvailable={currentSchedule != null}
        isLoggedIn={isLoggedIn()}
        semestersFromLocalStorage={semesters ?? []}
        schedulesLoading={schedulesLoading}
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
  schedulesLoading,
  scheduleLoading,
}: {
  isCurrentScheduleAvailable: boolean;
  isLoggedIn: boolean;
  semestersFromLocalStorage: string[];
  schedulesLoading: boolean;
  scheduleLoading: boolean;
}) {
  const [openDialog, setOpenDialog] = React.useState(
    !isCurrentScheduleAvailable
  );
  const [openPopover, setOpenPopover] = React.useState(false);
  const [value, setValue] = React.useState("");

  const semesters: { label: string; value: string }[] = [];
  for (const semester of semestersFromLocalStorage) {
    const label = semester;
    const value = semester;
    semesters.push({ label, value });
  }

  ///////////////////////////////////////////////////////////////////////
  if (!isLoggedIn) return null;
  if (isLoggedIn && isCurrentScheduleAvailable) return null;
  if (semestersFromLocalStorage == null) return null;
  if (schedulesLoading) return null;

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
            {/* //////////////////////////////////////////////////////////////// */}
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPopover}
                  className="w-full justify-between"
                  disabled={scheduleLoading}
                >
                  {value
                    ? semesters.find((semester) => semester.value === value)
                        ?.label
                    : "Chọn học kỳ"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
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
                            setOpenPopover(false);
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
          <Button type="submit" disabled={scheduleLoading}>
            {scheduleLoading && (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            )}
            {scheduleLoading
              ? "Đang tải, vui lòng chờ.."
              : "Tải thời khóa biểu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
