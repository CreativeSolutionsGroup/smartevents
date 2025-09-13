"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Attendance } from "@prisma/client";
import { Button } from "../ui/button";

export default function EventWinnerPicker({
  attendees,
}: {
  attendees: Array<Attendance & { user: { email: string } }>;
}) {
  const [numWinners, setNumWinners] = useState(20);
  const [winners, setWinners] = useState<
    Array<Attendance & { user: { email: string } }>
  >([]);

  function pickWinners() {
    let count = 0;
    const interval = setInterval(() => {
      if (count < numWinners) {
        if (numWinners > attendees.length) {
          setWinners(attendees);
          clearInterval(interval);
          return;
        }
        const shuffled = [...attendees].sort(() => 0.5 - Math.random());
        setWinners(shuffled.slice(0, numWinners));
        count++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="num-winners" className="block text-sm font-medium w-32">
          Number of Winners
        </label>
        <Input
          id="num-winners"
          type="number"
          value={numWinners}
          onChange={(e) => setNumWinners(Number(e.target.value))}
          className="mt-1 w-40"
        />
        <Button className="mt-1" onClick={pickWinners}>
          GO
        </Button>
      </div>
      <div>
        <h2 className="text-lg">Winners:</h2>
        {winners.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {winners.map((winner) => (
              <div key={winner.id} className="py-2 px-4 bg-muted rounded-full">
                {winner.user.email}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-2 bg-muted rounded-full py-2 px-4">
            No winners selected
          </p>
        )}
      </div>
    </div>
  );
}
