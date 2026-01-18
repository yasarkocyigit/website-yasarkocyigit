"use client";

import { useEffect, useState } from "react";

function formatTicker(date: Date) {
  const pad = (value: number) => value.toString().padStart(2, "0");
  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear().toString().slice(-2);
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${day}.${month}.${year} at ${hours}:${minutes}:${seconds} GMT [ YK NOTES ]`;
}

export default function Ticker() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setValue(formatTicker(new Date()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="mono text-[0.55rem] tracking-[0.18em] text-muted sm:text-[0.6rem] sm:tracking-[0.32em]"
    >
      {value ?? ""}
    </div>
  );
}
