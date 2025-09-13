import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { auth } from "@/auth";
import Stinger from "@/images/stinger.png";

export default async function UserAvatar() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex *:items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto cursor-pointer">
          <Avatar>
            <AvatarImage
              className="bg-muted-foreground"
              src={user?.image ?? Stinger.src}
              alt="User Avatar"
            />
            <AvatarFallback>
              <UserRound width={32} height={32} />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6">
          {user ? (
            <>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/" className="dropdown-item">
                  My Events
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href={`/api/auth/signout?callbackUrl=${encodeURIComponent(
                    "/"
                  )}`}
                  className="dropdown-item"
                >
                  Sign out
                </Link>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href={`/api/auth/signin?callbackUrl=${encodeURIComponent("/")}`}
                className="dropdown-item"
              >
                Sign in
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
