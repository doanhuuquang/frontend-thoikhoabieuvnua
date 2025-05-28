import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";

type WeekDayItemProps = {
  dayOfTheMonth: string;
  dayOfTheWeek: string;
} & React.ComponentProps<typeof PopoverPrimitive.Trigger>;

function WeekDayItem({
  dayOfTheMonth,
  dayOfTheWeek,
  ...props
}: WeekDayItemProps) {
  return (
    <button
      type="button"
      className="w-full relative p-1 bg-background rounded-md border flex flex-col items-center gap-1 justify-center text-center hover:border-primary hover:cursor-pointer transition"
      {...props}
    >
      <p className="lg:text-[15px] text-[10px] ">{dayOfTheWeek}</p>
      <p className="font-bold lg:text-[15px] text-[10px]">{dayOfTheMonth}</p>
      <div className="bg-primary absolute -bottom-0.5 border-2 border-background -right-0.5 w-2 h-2 rounded-full"></div>
    </button>
  );
}

export default function WeekDaySelector({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1", className)}>
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="Thu 2" />
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="Thu 3" />
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="Thu 4" />
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="Thu 5" />
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="Thu 6" />
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="Thu 7" />
      <WeekDayItem dayOfTheMonth="10" dayOfTheWeek="CN" />
    </div>
  );
}
