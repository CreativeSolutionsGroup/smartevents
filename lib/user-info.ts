"use server";

import { auth } from "@/auth";
import prisma from "./prisma";

export async function userIsAdmin() {
  const session = await auth();
  const authorizedUser = await prisma.authorizedUser.findUnique({
    where: { email: session?.user?.email || "" },
  });
  if (
    !session?.user ||
    !authorizedUser ||
    authorizedUser.role !== "ADMIN" ||
    session.provider === "credentials"
  ) {
    return false;
  }
  return true;
}
