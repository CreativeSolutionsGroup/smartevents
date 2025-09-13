"use client";

import { useRef } from "react";
import { Input } from "../ui/input";
import { Event } from "@prisma/client";

export default function EventNameEditor({
  event,
  updateEvent,
}: {
  event: Event;
  updateEvent: (id: string, data: Partial<Event>) => void;
}) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateEvent(event.id, { name: value });
    }, 1000);
  };

  return (
    <Input type="text" defaultValue={event.name} onChange={handleChange} />
  );
}
