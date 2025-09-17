import { auth } from "@/auth";
import AttendEvent from "@/components/events/attend-event";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function LoadingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  
  const session = await auth();
  const userEmail = session?.user?.email || "";

  if (userEmail === "") {
    redirect(`/event/${eventId}/attend`)
  }
  
  if (!event) {
    redirect("/event/not-found");
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-l-2 border-primary mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-foreground">
          Loading Event...
        </h2>
      </div>
      <AttendEvent eventId={eventId} userEmail={userEmail} />
    </div>
  );
}
