import AddEvent from "@/components/events/add-event";
import EventTable from "@/components/events/event-table";
import UserTable from "@/components/users/user-table";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const events = await prisma.event.findMany({
    orderBy: { startTime: "desc" },
  });
  const usersWithoutRole = await prisma.user.findMany({
    where: { authorizedUser: null },
  });
  await prisma.$transaction(async (prisma) => {
    await Promise.all(
      usersWithoutRole.map(async (user) => {
        await prisma.authorizedUser.upsert({
          where: { email: user.email },
          update: {
            userId: user.id,
          },
          create: {
            userId: user.id,
            email: user.email,
            role: "VIEWER",
          },
        });
      })
    );
  });
  const users = await prisma.user.findMany({
    include: { authorizedUser: true },
  });

  return (
    <div className="py-2 px-4 flex flex-col h-full">
      <h1 className="text-2xl">Admin Dashboard</h1>
      <div className="border-border border-2 rounded-md p-2 mt-2 min-w-[350px] max-w-[800px] max-[800px]:max-w-full bg-muted flex-1">
        <EventTable events={events} />
        <AddEvent />
      </div>
      <div className="border-border border-2 rounded-md p-2 mt-2 min-w-[350px] max-w-[800px] max-[800px]:max-w-full bg-muted flex-1">
        <UserTable users={users} />
      </div>
    </div>
  );
}
