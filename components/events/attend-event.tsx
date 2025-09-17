"use client";

import { attendEvent } from "@/lib/server/event";
import { useEffect, useRef } from "react";

export default function AttendEvent({
  eventId,
  userEmail,
}: {
  eventId: string;
  userEmail: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (formRef.current && !hasSubmitted.current) {
      hasSubmitted.current = true;
      formRef.current.requestSubmit();
    }
  }, []);

  return (
    <form
      action={async () => {
        await attendEvent(eventId, userEmail);
      }}
      ref={formRef}
      className="hidden"
    >
      <button type="submit"></button>
    </form>
  );
}
