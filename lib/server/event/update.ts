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
  let user = await prisma.authorizedUser.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    user = await prisma.authorizedUser.create({
      data: {
        email: userEmail,
        role: "VIEWER",
        user: { connect: { email: userEmail } },
      },
    });
  }

  if (!user) {
    redirect(`/event/${eventId}/attend`);
  }

  const userId = user.id;

  const existingAttendance = await prisma.attendance.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  if (!existingAttendance) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      redirect("/event/not-found");
    }

    if (event.startTime && new Date(event.startTime) > new Date()) {
      redirect(`/event/${eventId}/too-early`);
    }

    if (event.endTime && new Date(event.endTime) <= new Date()) {
      redirect(`/event/${eventId}/too-late`);
    }

    await prisma.attendance.create({
      data: {
        eventId,
        userId,
      },
    });

    redirect(`/event/${eventId}/success`);
  }

  redirect(`/event/${eventId}/duplicate`);
}
