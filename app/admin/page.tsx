import { auth } from "@/auth";
import AddEvent from "@/components/events/add-event";
import DeleteEvent from "@/components/events/delete-event";
import EventQRCode from "@/components/events/qr-code";
import UserSearch from "@/components/users/user-search";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  const user = await prisma.authorizedUser.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
  });
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const events = await prisma.event.findMany({});
  const users = await prisma.user.findMany({ include: { authorizedUser: true } });

  return (
    <div className="py-2 px-4 flex flex-col">
      <h1 className="text-2xl">Admin Dashboard</h1>
      <div className="border-border border-2 rounded-md p-2 mt-2 min-w-[350px] max-w-[800px] max-[800px]:max-w-full bg-muted">
        <h2 className="text-lg">Events</h2>
        <ul className="ml-4 max-h-[50vh] overflow-y-auto">
          {events.map((event) => (
            <li
              key={event.id}
              className="text-sm text-muted-foreground flex my-2 items-center"
            >
              <DeleteEvent eventId={event.id} />
              <span>{event.name}</span>
              <EventQRCode eventId={event.id} />
            </li>
          ))}
        </ul>
        <AddEvent />
      </div>
      <div className="border-border border-2 rounded-md p-2 mt-2 min-w-[350px] max-w-[800px] max-[800px]:max-w-full bg-muted">
        <UserSearch users={users} />
      </div>
    </div>
  );
}
