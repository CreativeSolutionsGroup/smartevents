import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Confetti from "@/components/confetti/confetti";
import { auth } from "@/auth";
import Image from "next/image";
import Stinger from "@/images/stinger.png";

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

  let message = <></>;
  // If the user is authenticated and has not recorded attendance, create a new attendance record
  if (user && !attendance) {
    if (
      event?.startTime &&
      new Date(event.startTime) <= new Date() &&
      event?.endTime &&
      new Date(event.endTime) > new Date()
    ) {
      await prisma.attendance.create({
        data: {
          eventId: eventId,
          userId: user.id,
        },
      });
      message = (
        <h2 className="text-3xl sm:text-4xl mb-4 text-center">
          Your attendance at <strong>{event?.name || notFound()}</strong> has
          been successfully recorded!
        </h2>
      );
    } else if (event?.startTime && new Date(event.startTime) > new Date()) {
      message = (
        <h2 className="text-3xl sm:text-4xl mb-4 text-center">
          The event has not started yet, attendance cannot be recorded.
        </h2>
      );
    } else {
      message = (
        <h2 className="text-3xl sm:text-4xl mb-4 text-center">
          The event has already ended, attendance cannot be recorded.
        </h2>
      );
    }
  } else {
    message = (
      <h2 className="text-3xl sm:text-4xl mb-4 text-center">
        You have already recorded your attendance for this event.
      </h2>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      {!attendance &&
      event?.startTime &&
      new Date(event.startTime) <= new Date() &&
      event?.endTime &&
      new Date(event.endTime) > new Date() ? (
        <Confetti />
      ) : null}
      <Image className="m-10" width={250} src={Stinger} alt="Stinger image" />
      {message}
    </div>
  );
}
