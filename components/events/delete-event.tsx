"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { deleteEvent } from "@/lib/server/event";

export default function DeleteEvent({ eventId }: { eventId: string }) {
  return (
    <Button
      variant="ghost"
      className="mr-1 cursor-pointer text-muted-foreground hover:text-destructive"
      onClick={() => {
        deleteEvent(eventId);
      }}
    >
      <Trash2 />
    </Button>
  );
}
