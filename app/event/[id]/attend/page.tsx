import { auth } from "@/auth";
import EmailSignIn from "@/components/sign-in/email-sign-in";
import SignInButton from "@/components/sign-in/sign-in";
import prisma from "@/lib/prisma";
import { attendEvent } from "@/lib/server/event";
import { notFound, redirect } from "next/navigation";

interface SuccessPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventsLanding({ params }: SuccessPageParams) {
  const session = await auth();
  if (session?.user && session.user.email) {
    await attendEvent((await params).id, session.user.email);
  }

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
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Welcome to {event?.name || notFound()}!
      </h1>
      <p className="text-lg mb-8 text-center">
        Sign in to record your attendance
      </p>
      <SignInButton callbackUrl={`/event/${eventId}/attend`} />
      <EmailSignIn callbackUrl={`/event/${eventId}/attend`} />
    </div>
  );
}
