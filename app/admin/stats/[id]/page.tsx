import { auth } from "@/auth";
import TrafficFlowChart from "@/components/admin/traffic-flow-chart";
import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface SuccessPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function StatsPage({ params }: SuccessPageParams) {
  const eventId = (await params).id;
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const user = await prisma.authorizedUser.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
  });
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  const attendees = await prisma.attendance.findMany({
    where: {
      eventId: eventId,
    },
    select: {
      id: true,
      userId: true,
      timestamp: true,
      user: true,
      event: true,
    },
  });

  // Compute attendance per hour
  const attendancePerHour: { hour: string; attendees: number }[] = [];
  const hourMap: Record<string, number> = {};

  attendees.forEach((attendance) => {
    // If checkInTime is missing, skip
    if (!attendance.timestamp) return;
    const date = new Date(attendance.timestamp);
    // Format hour as "YYYY-MM-DD HH:00"
    const hourStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:00`;
    hourMap[hourStr] = (hourMap[hourStr] || 0) + 1;
  });

  Object.entries(hourMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([hour, count]) => {
      attendancePerHour.push({ hour, attendees: count });
    });

  return (
    <div className="max-w-4xl mx-auto pt-3">
      <Link
        className="flex flex-row text-accent hover:text-muted-foreground mb-2"
        href="/admin"
      >
        <ChevronLeft className="mr-1 ml-[-0.5rem]" /> Back to Admin Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        Event Statistics
        <span className="block text-lg font-medium text-muted-foreground mt-1">
          {attendees[0]?.event.name ?? notFound()}
        </span>
      </h1>
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Total Attendees:</span>
          <span>{attendees.length}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">Event Date:</span>
          <span>
            {attendees[0]?.event.startTime.toLocaleDateString() ?? "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">Event Time:</span>
          <span>
            {(attendees[0]?.event.startTime.toLocaleTimeString() ?? "N/A") +
              " to " +
              (attendees[0]?.event.endTime.toLocaleTimeString() ?? "N/A")}
          </span>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Attendance Per Hour</h3>
        {attendancePerHour.length === 0 ? (
          <p className="text-muted-foreground">No attendance data available</p>
        ) : (
          <TrafficFlowChart data={attendancePerHour} />
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">Attendee List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-[400px] w-full bg-card border border-border rounded-lg shadow">
          <thead>
            <tr className="bg-muted">
              <th className="py-3 px-4 border-b border-border text-left">
                User ID
              </th>
              <th className="py-3 px-4 border-b border-border text-left">
                User Name
              </th>
              <th className="py-3 px-4 border-b border-border text-left">
                Check-in Time
              </th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendance) => (
              <tr
                key={attendance.id}
                className="even:bg-muted/50 hover:bg-muted"
              >
                <td className="py-2 px-4 border-b border-border">
                  {attendance.userId}
                </td>
                <td className="py-2 px-4 border-b border-border">
                  {attendance.user?.email || "N/A"}
                </td>
                <td className="py-2 px-4 border-b border-border">
                  {attendance.timestamp
                    ? attendance.timestamp.toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
