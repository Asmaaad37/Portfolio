'use client';

import { useEffect, useState } from 'react';

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Karachi',
  }).format(new Date());

interface LocalClockProps {
  prefix?: string;
  className?: string;
}

/** Local time in Sargodha. Renders a placeholder on the server to avoid a hydration mismatch. */
export default function LocalClock({
  prefix = 'Sargodha',
  className = 'clock',
}: LocalClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className}>
      {prefix && `${prefix} `}
      <time>{time ?? '—:—'}</time> PKT
    </span>
  );
}
