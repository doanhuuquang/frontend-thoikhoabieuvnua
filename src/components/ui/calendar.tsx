"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromDate,
  locale = vi,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      fromDate={fromDate}
      locale={locale}
      className={cn("p-3 w-full", className)}
      classNames={{
        months: "w-full flex flex-col sm:flex-row gap-2",
        month: "w-full flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center ml-auto gap-3",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: " left-1",
        nav_button_next: " right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex justify-between w-full",
        head_cell:
          "text-muted-foreground rounded-md w-[32px] h-[32px] font-normal text-[0.8rem]",
        row: " rounded-md flex justify-between w-full mt-2 ",
        cell: cn(
          "relative p-0 rounded-full text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-full",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-full [&:has(>.day-range-start)]:rounded-l-full first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full"
            : "[&:has([aria-selected])]:rounded-full"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal rounded-lg aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected: "border border-primary text-primary",
        day_today: "bg-primary text-white",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
