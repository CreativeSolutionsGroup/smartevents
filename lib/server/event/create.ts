"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createEvent = async (
  eventName: string,
  start: Date,
  end: Date
) => {
  const event = await prisma.event.create({
    data: {
      name: eventName,
      startTime: start,
      endTime: end,
    },
  });

  revalidatePath("/admin");
  return event;
};
