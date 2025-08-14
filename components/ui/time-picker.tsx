import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TimePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a time...",
  required = false,
}: DateTimePickerProps) {
  const [currentHour, setCurrentHour] = useState<number | undefined>(
    value?.getHours()
  );
  const [currentMinute, setCurrentMinute] = useState<number | undefined>(
    value?.getMinutes()
  );

  useEffect(() => {
    if (currentHour !== undefined && currentMinute !== undefined) {
      const newDate = new Date(value || Date.now());
      if (value?.getHours() ?? 0 > 12) {
        newDate.setHours(currentHour + 12);
      } else {
        newDate.setHours(currentHour);
      }
      newDate.setMinutes(currentMinute);
      onChange?.(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour, currentMinute]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <input
          type="time"
          value={value && !isNaN(value.getTime()) ? format(value, "HH:mm") : ""}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":").map(Number);
            if (hours === undefined || minutes === undefined) {
              return;
            }
            const newDate = new Date();
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            onChange?.(newDate);
          }}
          placeholder={placeholder}
          required={required}
          className={cn("min-w-27 p-2 border rounded", className)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="flex">
          <div className="flex-1 flex flex-col overflow-y-auto max-h-60 items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">
              Hour
            </p>
            {Array.from({ length: 12 }, (_, hour) => (
              <p
                key={hour}
                className={cn(
                  "text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer",
                  {
                    "bg-primary": currentHour === hour + 1,
                  }
                )}
                onClick={() => setCurrentHour(hour + 1)}
              >
                {(hour + 1).toString().padStart(2, "0")}
              </p>
            ))}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto max-h-60 items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">
              Minute
            </p>
            {Array.from({ length: 60 }, (_, minute) => (
              <p
                key={minute}
                className={cn(
                  "text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer",
                  {
                    "bg-primary": currentMinute === minute,
                  }
                )}
                onClick={() => setCurrentMinute(minute)}
              >
                {minute.toString().padStart(2, "0")}
              </p>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">
              AM/PM
            </p>
            {["AM", "PM"].map((period) => (
              <p
                key={period}
                className={cn(
                  "text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer",
                  {
                    "bg-primary":
                      value &&
                      ((period === "AM" && value.getHours() < 12) ||
                        (period === "PM" && value.getHours() >= 12)),
                  }
                )}
                onClick={() => {
                  if (!value) return;
                  const hours = value.getHours();
                  let newHours = hours;
                  if (period === "AM" && hours >= 12) {
                    newHours = hours - 12;
                  } else if (period === "PM" && hours < 12) {
                    newHours = hours + 12;
                  }
                  const newDate = new Date(value);
                  newDate.setHours(newHours);
                  onChange?.(newDate);
                  setCurrentHour(newHours % 12 === 0 ? 12 : newHours % 12);
                }}
              >
                {period}
              </p>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
