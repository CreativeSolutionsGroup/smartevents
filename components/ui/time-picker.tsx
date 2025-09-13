import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Input } from "./input";

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
  // Initialize state in 12-hour format and track AM/PM explicitly
  const [currentHour, setCurrentHour] = useState<number | undefined>(
    value ? value.getHours() % 12 || 12 : undefined
  );
  const [currentMinute, setCurrentMinute] = useState<number | undefined>(
    value?.getMinutes()
  );
  const [period, setPeriod] = useState<"AM" | "PM">(
    value && value.getHours() >= 12 ? "PM" : "AM"
  );

  const to24 = (h12: number, p: "AM" | "PM") => {
    const h = h12 % 12;
    return p === "PM" ? h + 12 : h;
  };

  useEffect(() => {
    if (value && !isNaN(value.getTime())) {
      setCurrentHour(value.getHours() % 12 || 12);
      setCurrentMinute(value.getMinutes());
      setPeriod(value.getHours() >= 12 ? "PM" : "AM");
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Input
          type="time"
          value={value && !isNaN(value.getTime()) ? format(value, "HH:mm") : ""}
          onChange={(e) => {
            const [hours, minutes] = e.target.value.split(":").map(Number);
            if (isNaN(hours) || isNaN(minutes)) return;
            const newDate = new Date(value || Date.now());
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
            onChange?.(newDate);
            
            setPeriod(hours >= 12 ? "PM" : "AM");
            setCurrentHour(hours % 12 || 12);
            setCurrentMinute(minutes);
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
                onClick={() => {
                  const h12 = hour + 1;
                  setCurrentHour(h12);
                  const base = new Date(value || Date.now());
                  base.setHours(to24(h12, period));
                  base.setMinutes(currentMinute ?? base.getMinutes());
                  onChange?.(base);
                }}
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
                onClick={() => {
                  setCurrentMinute(minute);
                  const base = new Date(value || Date.now());
                  const h12 = currentHour ?? (base.getHours() % 12 || 12);
                  const per = period ?? (base.getHours() >= 12 ? "PM" : "AM");
                  base.setHours(to24(h12, per));
                  base.setMinutes(minute);
                  onChange?.(base);
                }}
              >
                {minute.toString().padStart(2, "0")}
              </p>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center">
            <p className="sticky top-0 bg-popover w-full text-center pb-1">
              AM/PM
            </p>
            {["AM", "PM"].map((p) => (
              <p
                key={p}
                className={cn(
                  "text-center w-10 py-1 rounded-md hover:bg-primary/50 cursor-pointer",
                  {
                    "bg-primary": period === p,
                  }
                )}
                onClick={() => {
                  setPeriod(p as "AM" | "PM");
                  const base = new Date(value || Date.now());
                  const h12 = currentHour ?? (base.getHours() % 12 || 12);
                  base.setHours(to24(h12, p as "AM" | "PM"));
                  base.setMinutes(currentMinute ?? base.getMinutes());
                  onChange?.(base);
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
