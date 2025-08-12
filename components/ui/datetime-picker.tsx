import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  required?: boolean; // added
}

export function DateTimePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a date and time...",
  required = false, // added
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  );
  const [time, setTime] = React.useState<string>(
    value ? format(value, "HH:mm") : ""
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setTime(format(value, "HH:mm"));
    }
  }, [value]);

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date);
    if (date && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onChange?.(newDate);
    } else {
      onChange?.(undefined);
    }
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTime = e.target.value;
    setTime(newTime);
    if (selectedDate && newTime) {
      const [hours, minutes] = newTime.split(":").map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      onChange?.(newDate);
    }
  }

  function displayValue() {
    if (selectedDate && time) {
      return format(selectedDate, "yyyy-MM-dd") + " " + time;
    }
    return "";
  }

  const isInvalid = required && (!selectedDate || !time);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal cursor-pointer",
            !selectedDate && "text-muted-foreground",
            isInvalid && "border-destructive focus:ring-destructive",
            className
          )}
        >
          {displayValue() || <span>{placeholder}</span>}
          {required && (
            <span
              className={cn("ml-1 text-destructive", isInvalid ? "" : "hidden")}
            >
              *
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col gap-2 p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            autoFocus
          />
          <div className="flex items-center">
            <Clock className="mr-4" />
            <Input
              type="time"
              value={time}
              onChange={handleTimeChange}
              className={cn(
                isInvalid && "border-destructive focus:ring-destructive"
              )}
              required={required}
            />
          </div>
          {isInvalid && (
            <span className="text-xs text-destructive mt-1">
              Date and time are required.
            </span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
