'use client';

import { useRef } from 'react';

import { marqueeStack } from '@/data/home';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/motion';

/** M06: stack ticker that speeds up, skews and reverses with scroll velocity. */
export default function Marquee() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = trackRef.current;
        if (!track) return;
        const loop = gsap.to(track, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: 'none',
        });
        loop.totalTime(30 * 50);
        const skew = gsap.quickTo(track, 'skewX', {
          duration: 0.4,
          ease: 'power3',
        });
        let dir = 1;
        let settle = 0;

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate(self) {
            dir = self.direction;
            const v = self.getVelocity();
            loop.timeScale(
              dir * (1 + gsap.utils.clamp(0, 6, Math.abs(v) / 280)),
            );
            skew(gsap.utils.clamp(-14, 14, -v / 160));
            window.clearTimeout(settle);
            settle = window.setTimeout(() => {
              gsap.to(loop, {
                timeScale: dir,
                duration: 0.9,
                ease: 'power2.out',
              });
              skew(0);
            }, 110);
          },
        });

        // Only tick while the ticker is on screen.
        ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => {
            if (self.isActive) loop.resume();
            else loop.pause();
          },
        });

        return () => window.clearTimeout(settle);
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const items = (hidden: boolean) =>
    marqueeStack.map((name) => (
      <span key={`${name}-${hidden}`} aria-hidden={hidden || undefined}>
        {name}
        <i aria-hidden="true">✦</i>
      </span>
    ));

  return (
    <section className="marquee" ref={rootRef} aria-label="Stack">
      <div ref={trackRef} className="mq-track">
        {items(false)}
        {items(true)}
      </div>
    </section>
  );
}
