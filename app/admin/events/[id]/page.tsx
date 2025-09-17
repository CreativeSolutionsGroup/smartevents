import EventWinnerPicker from "@/components/events/winner-picker";
import prisma from "@/lib/prisma";

interface EventPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailsPage({ params }: EventPageParams) {
  const eventId = (await params).id;
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  const attendees = await prisma.attendance.findMany({
    where: {
      eventId: eventId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 flex flex-col">
      <h1 className="text-2xl">{event?.name}</h1>
      <div className="mt-2 border rounded-md p-4 bg-muted/40 max-w-2xl">
        <h2 className="text-lg font-semibold">Pick Winners</h2>
        <EventWinnerPicker attendees={attendees} />
      </div>
      <h2 className="text-lg font-semibold mt-4">Attendees</h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="py-2 px-4 bg-muted rounded-full">
            {attendee.user.email}
          </div>
        ))}
        {attendees.length === 0 && <p>No attendees yet.</p>}
      </div>
    </div>
  );
}
