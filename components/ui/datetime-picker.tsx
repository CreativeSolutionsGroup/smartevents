import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import TimePicker from "./time-picker";
import { useEffect, useState } from "react";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  className,
  placeholder = "Pick a date and time...",
  required = false,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  function handleUpdate(date: Date | undefined) {
    setSelectedDate(date);
    onChange?.(date);
  }

  function displayValue() {
    if (selectedDate && !isNaN(selectedDate.getTime())) {
      return format(selectedDate, "yyyy-MM-dd hh:mm a");
    }
    return "";
  }

  const isInvalid = required && !selectedDate;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
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
            onSelect={handleUpdate}
            autoFocus
            classNames={{
              today: "bg-muted rounded-md",
            }}
          />
          <div className="flex items-center mx-auto">
            <Clock className="mr-3" />
            <TimePicker
              value={selectedDate}
              onChange={handleUpdate}
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
