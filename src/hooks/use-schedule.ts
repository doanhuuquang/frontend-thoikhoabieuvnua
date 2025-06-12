import { useContext } from "react";
import { ScheduleContext } from "@/contexts/ScheduleContext";

export function useSchedule() {
  return useContext(ScheduleContext);
}
