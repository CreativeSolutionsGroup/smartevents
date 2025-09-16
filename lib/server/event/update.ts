"use server";

import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateEvent(id: string, data: Partial<Event>) {
  await prisma.event.update({
    where: { id },
    data,
  });

  revalidatePath("/admin");
}

export async function attendEvent(eventId: string, userEmail: string) {
  console.log("attendEvent called with:", { eventId, userEmail });

  const user = await prisma.authorizedUser.findUnique({
    where: { email: userEmail },
  });

  console.log("user found:", user);

  if (!user) {
    console.log("User not found, redirecting to sign-in");
    redirect("/event/sign-in");
  }

  const userId = user.id;

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  console.log("existingAttendance:", existingAttendance);

  if (!existingAttendance) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    console.log("event found:", event);

    if (!event) {
      console.log("Event not found, redirecting to not-found");
      redirect("/event/not-found");
    }

    if (event.startTime && new Date(event.startTime) > new Date()) {
      console.log("Event has not started yet, redirecting to too-early");
      redirect(`/event/${eventId}/too-early`);
    }

    if (event.endTime && new Date(event.endTime) <= new Date()) {
      console.log("Event has ended, redirecting to too-late");
      redirect(`/event/${eventId}/too-late`);
    }

    console.log("Creating new attendance record");
    await prisma.attendance.create({
      data: {
        eventId,
        userId,
      },
    });

    console.log("Attendance created successfully, redirecting to success");
    redirect(`/event/${eventId}/success`);
  }

  console.log("User already attending event, redirecting to duplicate");
  redirect(`/event/${eventId}/duplicate`);
}
