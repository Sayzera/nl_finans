import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch } from "react-redux";
import { setSearchDate } from "@/redux/main-slice";
import moment from "moment";
export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const _date = moment(date).format("YYYY-MM-DD");
    dispatch(setSearchDate(_date));
  }, [date]);

  // console.log(date?.from, date?.to);
  // Thu Jan 19 2023 00:00:00 GMT+0300 (GMT+03:00) Wed Feb 15 2023 00:00:00 GMT+0300 (GMT+03:00)
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {/* {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )} */}

            {date ? (
              moment(date).format("DD.MM.YYYY")
            ) : (
              <span>{moment().format("DD.MM.YYYY")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
