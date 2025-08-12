"use client";

import { CheckCircle, CircleX, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { DateTimePicker } from "../ui/datetime-picker";
import { createEvent } from "@/lib/server/event";

export default function AddEvent() {
  const [showInput, setShowInput] = useState(false);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex gap-2 items-center mt-4">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => setShowInput(true)}
      >
        <Plus />
      </Button>
      <Input
        type="text"
        placeholder="Event name"
        className={`transition-all duration-200 ease-in-out ${
          showInput ? "opacity-100" : "opacity-0"
        }`}
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <DateTimePicker
        placeholder="Start Date"
        value={startDate}
        onChange={setStartDate}
        className={`transition-all duration-200 ease-in-out ${
          showInput ? "opacity-100" : "opacity-0"
        }`}
        required
      />
      <DateTimePicker
        placeholder="End Date"
        value={endDate}
        onChange={setEndDate}
        className={`transition-all duration-200 ease-in-out ${
          showInput ? "opacity-100" : "opacity-0"
        }`}
        required
      />
      <Button
        variant="ghost"
        className={`cursor-pointer transition-all duration-200 ease-in-out ${
          showInput ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setShowInput(false);
          if (eventName && startDate && endDate) {
            createEvent(eventName, startDate ?? new Date(), endDate ?? new Date());
          }
        }}
      >
        <CheckCircle className="text-accent" />
      </Button>
      <Button
        variant="ghost"
        className={`cursor-pointer transition-all duration-200 ease-in-out ${
          showInput ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setShowInput(false);
          setEventName("");
          setStartDate(undefined);
          setEndDate(undefined);
        }}
      >
        <CircleX className="text-accent" />
      </Button>
    </div>
  );
}
