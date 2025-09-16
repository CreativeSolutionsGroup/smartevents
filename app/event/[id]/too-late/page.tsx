import prisma from "@/lib/prisma";
import Image from "next/image";
import Stinger from "@/images/stinger.png";
import { redirect } from "next/navigation";

export default async function TooEarlyPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const eventId = (await params).id;

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    redirect("/event/not-found");
  }

  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <Image
        className="mb-4"
        src={Stinger}
        alt="Cedarville Stinger"
        width={250}
        height={250}
      />
      <h1 className="text-3xl font-bold mb-4">Just Missed It!</h1>
      <p className="text-lg text-center max-w-md">
        Attendance for <strong>{event?.name}</strong> cannot be recorded
        anymore. We&apos;re sorry you missed it!
      </p>
    </div>
  );
}
