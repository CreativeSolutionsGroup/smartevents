"use client";

import { deleteEvent, updateEvent } from "@/lib/server/event";
import { Event } from "@prisma/client";
import {
  ChartColumnIncreasing,
  Dice5,
  Search,
  Trash2
} from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/datetime-picker";
import { Input } from "../ui/input";
import EventNameEditor from "./name-edit";
import EventQRCode from "./qr-code";

export default function EventTable({ events }: { events: Event[] }) {
  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(
    () =>
      events.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      ),
    [events, query]
  );

  return (
    <div className="overflow-auto max-h-[40vh]">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h2 className="text-lg">Events</h2>
        <div className="flex items-center gap-1 max-w-3xs">
          <Search className="h-6 w-6 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="min-w-full">
        <thead className="sticky top-0 bg-muted">
          <tr>
            <th className="py-2">Event Name</th>
            <th className="py-2">Start Date</th>
            <th className="py-2">End Date</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td className="py-2 min-w-48">
                <EventNameEditor event={event} updateEvent={updateEvent} />
              </td>
              <td className="py-2">
                <div className="flex justify-center">
                  <DateTimePicker
                    value={event.startTime}
                    onChange={(date) => {
                      updateEvent(event.id, {
                        startTime: date,
                      });
                    }}
                  />
                </div>
              </td>
              <td className="py-2">
                <div className="flex justify-center">
                  <DateTimePicker
                    value={event.endTime}
                    onChange={(date) => {
                      updateEvent(event.id, {
                        endTime: date,
                      });
                    }}
                  />
                </div>
              </td>
              <td className="py-2">
                <div className="flex justify-center gap-1">
                  <Button variant="ghost" onClick={() => deleteEvent(event.id)}>
                    <Trash2 />
                  </Button>
                  <EventQRCode eventId={event.id} />
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() =>
                      redirect(`/admin/stats/${event.id}`, RedirectType.push)
                    }
                  >
                    <ChartColumnIncreasing />
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() =>
                      redirect(`/admin/events/${event.id}`, RedirectType.push)
                    }
                  >
                    <Dice5 />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
