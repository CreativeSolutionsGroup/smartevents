"use server";

import prisma from "@/lib/prisma";

export async function readRole(userId: string) {
  try {
    const user = await prisma.authorizedUser.findUnique({
      where: { id: userId },
      select: {
        role: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.role;
  } catch (error) {
    console.error("Error reading user role:", error);
    throw error;
  }
}