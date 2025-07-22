// components/DateRangePicker.tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export function DateRangePicker({
  onChange,
}: {
  onChange: (range: DateRange) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  const handleChange = (range: DateRange | undefined) => {
    setDate(range);
    if (range) onChange(range);
  };

  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[260px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, "dd MMM yyyy")} – ${format(
                  date.to,
                  "dd MMM yyyy"
                )}`
              ) : (
                format(date.from, "dd MMM yyyy")
              )
            ) : (
              <span>Tarih Seç</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
