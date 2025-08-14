"use client";

import { CheckCircle, CircleX, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/datetime-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

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
          showInput ? "opacity-100" : "opacity-0!"
        }`}
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        disabled={!showInput}
      />
      <div className="flex gap-2 justify-end">
        <Dialog
          onOpenChange={(open) => {
            if (!open) {
              setEventName("");
              setStartDate(undefined);
              setEndDate(undefined);
              setShowInput(false);
            }
          }}
        >
          <DialogTrigger asChild disabled={!showInput || !eventName}>
            <Button
              variant="ghost"
              className={`transition-all duration-200 ease-in-out cursor-pointer ${
                showInput ? "opacity-100" : "opacity-0!"
              }`}
            >
              <CheckCircle className="text-accent" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{eventName} Dates</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <DateTimePicker
                placeholder="Start Date"
                value={startDate}
                onChange={setStartDate}
                required
              />
              <DateTimePicker
                placeholder="End Date"
                value={endDate}
                onChange={setEndDate}
                required
              />
              <Button className="w-min ml-auto">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          onClick={() => {
            setShowInput(false);
            setEventName("");
            setStartDate(undefined);
            setEndDate(undefined);
          }}
          disabled={!showInput}
          className={`transition-all duration-200 ease-in-out cursor-pointer ${
            showInput ? "opacity-100" : "opacity-0!"
          }`}
        >
          <CircleX className="text-accent" />
        </Button>
      </div>
    </div>
  );
}
