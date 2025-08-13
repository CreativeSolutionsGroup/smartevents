import Link from "next/link";
import UserAvatar from "./user-avatar";
import { auth } from "@/auth";
import { Button } from "../ui/button";

export default async function AppBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex justify-between content-center px-3 py-2 bg-primary text-primary-foreground">
      <Link href="/" className="text-2xl">Smart Events</Link>
      <div className="flex items-center gap-4">
        {user && (
          <Button asChild variant="secondary">
            <Link href="/admin">
              Admin
            </Link>
          </Button>
        )}
        <UserAvatar />
      </div>
    </header>
  );
}
