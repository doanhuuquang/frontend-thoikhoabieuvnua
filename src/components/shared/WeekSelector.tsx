"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useScheduleCalculator } from "@/hooks/useScheduleCalculator";
import { ScheduleData } from "@/data/ScheduleData";

type Weeks = { weekNumber: string; weekString: string }[];

export default function WeekSelector({ className }: { className: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const caculator = useScheduleCalculator(ScheduleData);
  const weeks: Weeks = caculator.getWeeks();

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between lg:w-full w-[300px]"
          >
            <p className="truncate pr-2">
              {value
                ? weeks.find((week) => week.weekNumber === value)?.weekString
                : "Chọn tuần học..."}
            </p>
            <ChevronsUpDown className="opacity-50 flex-shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command className="w-full">
            <CommandInput placeholder="Tìm tuần học..." className="h-9" />
            <CommandList>
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup>
                {weeks.map((week) => (
                  <CommandItem
                    key={week.weekNumber}
                    value={week.weekNumber}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? value : currentValue);
                      setOpen(false);
                    }}
                  >
                    {week.weekString}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === week.weekNumber ? "opacity-100" : "opacity-0"
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
  );
}
