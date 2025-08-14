"use server";

import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateEvent(id: string, data: Partial<Event>) {
  await prisma.event.update({
    where: { id },
    data,
  });

  revalidatePath("/admin")
}
