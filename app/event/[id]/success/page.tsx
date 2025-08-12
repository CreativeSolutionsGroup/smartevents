import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Confetti from "@/components/confetti/confetti";
import { auth } from "@/auth";

interface SuccessPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventSuccessPage({ params }: SuccessPageParams) {
  const eventId = (await params).id;
  const session = await auth();

  if (!session?.user) {
    redirect(`/event/${eventId}/attend`);
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  const user = await prisma.authorizedUser.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
  });
  const attendance = await prisma.attendance.findFirst({
    where: {
      eventId: eventId,
      userId: user?.id || undefined,
    },
  });

  //const message = "";
  // If the user is authenticated and has not recorded attendance, create a new attendance record
  if (user && !attendance) {
    if (event?.endTime && new Date(event.endTime) > new Date()) {
      await prisma.attendance.create({
        data: {
          eventId: eventId,
          userId: user.id,
        },
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      {!attendance ? <Confetti /> : null}
      <h2 className="text-3xl sm:text-4xl mb-4 text-center">
        Your attendance at <strong>{event?.name || notFound()}</strong>{" "}
        {!attendance ? "has been successfully" : "was already"} recorded!
      </h2>
    </div>
  );
}
