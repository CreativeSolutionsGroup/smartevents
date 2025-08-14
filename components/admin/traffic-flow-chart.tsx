"use client";

import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";


export default function TrafficFlowChart({
  data,
}: {
  data: { hour: string; attendees: number }[];
}) {
  return (
    <BarChart width={730} height={250} data={data}>
      <XAxis dataKey="hour" />
      <YAxis allowDecimals={false} />
      <Tooltip
        content={({ active, payload, label }) =>
          active && payload && payload.length ? (
            <div className="bg-background border border-border rounded-lg shadow-lg p-2">
              <strong>Hour: {label}</strong>
              <div>Attendees: {payload[0].value}</div>
            </div>
          ) : null
        }
      />
      <Bar dataKey="attendees" fill="#2563eb" radius={4} />
    </BarChart>
  );
}
