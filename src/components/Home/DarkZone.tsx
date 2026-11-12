'use client';

import { type ReactNode, useRef } from 'react';

import { ScrollTrigger, useGSAP } from '@/lib/motion';

/**
 * M08: the whole page flips from paper to the blue field while this zone is
 * in the middle of the screen. Runs under reduced motion too (the colour
 * change is then instant), so text and glass always sit on the right ground.
 */
export default function DarkZone({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 55%',
        end: 'bottom 40%',
        toggleClass: { targets: document.body, className: 'is-dark' },
      });
      return () => {
        trigger.kill();
        document.body.classList.remove('is-dark');
      };
    },
    { scope: ref },
  );

  return (
    <div className="dark-zone" ref={ref}>
      {children}
    </div>
  );
}
