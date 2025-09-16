import { auth } from "@/auth";
import Stinger from "@/images/stinger.png";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

interface SuccessPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function DuplicateAttendancePage({
  params,
}: SuccessPageParams) {
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
      <h1 className="text-3xl font-bold mb-4">Twins?</h1>
      <p className="text-lg text-center max-w-md">
        It looks like your attendance for <strong>{event?.name}</strong> has
        already been recorded. Unless you have a secret twin, you can rest
        assured that we&apos;ve got you marked present!
      </p>
    </div>
  );
}
