"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiComponent() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <Confetti width={width} height={height} />
    </div>
  );
}
