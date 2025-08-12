"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string) {
  const event = await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  revalidatePath("/admin");
  return event;
}
