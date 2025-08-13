import { auth } from "@/auth";
import SignInButton from "@/components/entra-sign-in/sign-in";
import prisma from "@/lib/prisma";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SignInButton callbackUrl="/" />
      </div>
    );
  }

  const attendance = await prisma.attendance.findMany({
    where: {
      user: {
        email: user.email || undefined,
      },
    },
    include: {
      event: true,
      user: true,
    },
  });

  return (
    <div className="space-y-6 m-10">
      <h1 className="text-2xl font-bold">Events Attended</h1>
      <div className="grid gap-4">
        {attendance.length > 0 ? (
          attendance.map((att) => (
            <div
              key={att.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-muted"
            >
              <h2 className="text-xl font-semibold color-foreground">{att.event.name}</h2>
              <p className="text-muted-foreground">
          On{" "}
          {new Date(att.event.startTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
              </p>
            </div>
          ))
        ) : (
          <div className="p-8 border rounded-lg shadow-sm text-center bg-muted">
            <h2 className="text-xl font-semibold text-muted-foreground">No Events Attended</h2>
            <p className="text-muted-foreground mt-2">
              You haven&apos;t attended any events yet. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
