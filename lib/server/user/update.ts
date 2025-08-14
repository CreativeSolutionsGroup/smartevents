"use server";

import prisma from "@/lib/prisma";
import { Roles } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateRole(userId: string, role: string) {
  await prisma.authorizedUser.update({
    where: { userId: userId },
    data: { role: role as Roles },
  });

  revalidatePath("/admin");
}
