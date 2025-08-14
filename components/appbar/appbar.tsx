import Link from "next/link";
import UserAvatar from "./user-avatar";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import prisma from "@/lib/prisma";
import { Roles } from "@prisma/client";

export default async function AppBar() {
  const session = await auth();
  const user = session?.user;

  const dbUser = await prisma.user.findUnique({
    where: {
      email: user?.email || "",
    },
    include: {
      authorizedUser: true,
    },
  });

  return (
    <header className="flex justify-between content-center px-3 py-2 bg-primary text-primary-foreground sticky top-0 z-50">
      <Link href="/" className="text-2xl">
        Smart Events
      </Link>
      <div className="flex items-center gap-4">
        {dbUser?.authorizedUser?.role === Roles.ADMIN && (
          <Button asChild variant="secondary">
            <Link href="/admin">Admin</Link>
          </Button>
        )}
        <UserAvatar />
      </div>
    </header>
  );
}
