"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string) {
  await prisma.attendance.deleteMany({
    where: {
      eventId: eventId,
    },
  });
  const event = await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  revalidatePath("/admin");
  return event;
}
