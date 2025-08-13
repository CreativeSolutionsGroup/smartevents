import React from "react";
import { notFound } from "next/navigation";
import SignInButton from "@/components/entra-sign-in/sign-in";
import prisma from "@/lib/prisma";

interface SuccessPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventsLanding({ params }: SuccessPageParams) {
  const eventId = (await params).id;

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Welcome to {event?.name || notFound()}!
      </h1>
      <p className="text-lg mb-8 text-center">
        Sign in to record your attendance
      </p>
      <SignInButton callbackUrl={"/event/" + eventId + "/success"} />
    </div>
  );
}
