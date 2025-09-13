import Stinger from "@/images/stinger.png";
import { userIsAdmin } from "@/lib/user-info";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAvatar from "./user-avatar";

export default async function AppBar() {
  return (
    <header className="flex justify-between content-center px-3 py-2 bg-primary text-primary-foreground sticky top-0 z-50">
      <Link href="/" className="text-2xl flex gap-2 items-center">
        <Image
          src={Stinger}
          alt="Smart Events Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        Smart Events
      </Link>
      <div className="flex items-center gap-4">
        {(await userIsAdmin()) && (
          <Button asChild variant="secondary">
            <Link href="/admin">Admin</Link>
          </Button>
        )}
        <UserAvatar />
      </div>
    </header>
  );
}
