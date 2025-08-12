import { auth } from "@/auth";
import SignInButton from "@/components/custom/signIn";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();

  const userId = session?.user?.id;

  const attendance = await prisma.attendance.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      event: true,
      user: true,
    },
  });

  return !session?.user ? (
    <>
      <div>
        <SignInButton callbackUrl="/" />
      </div>
    </>
  ) : (
    <>
      <div className="space-y-6 m-10">
        <h1 className="text-2xl font-bold">Events Attended</h1>
        <div className="grid gap-4">
          {attendance.map((att) => (
            <div
              key={att.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-gray-900"
            >
              <h2 className="text-xl font-semibold">{att.event.name}</h2>
              <p className="text-gray-600">
                On{" "}
                {new Date(att.event.startTime).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
