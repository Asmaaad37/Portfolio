'use client';

import { Fragment, useRef } from 'react';

import Chip from '@/components/ui/Chip';
import { statement } from '@/data/home';
import { DESKTOP, gsap, MOTION_OK, useGSAP } from '@/lib/motion';

function words(text: string, highlight: boolean, keyPrefix: string) {
  return text.split(/(\s+)/).map((part, i) => {
    const key = `${keyPrefix}${i}`;
    if (!part) return null;
    if (/^\s+$/.test(part)) return <Fragment key={key}>{part}</Fragment>;
    return (
      <span key={key} className={highlight ? 'w hl' : 'w'}>
        {part}
      </span>
    );
  });
}

interface StatementProps {
  id?: string;
  label?: string;
}

/** M07: the line lights up word by word; pinned while it does on desktop. */
export default function Statement({ id, label = 'FIG. 02' }: StatementProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, desk: DESKTOP }, (ctx) => {
        const { motion, desk } = ctx.conditions ?? {};
        if (!motion) return;
        gsap.fromTo(
          '.w',
          // 0.62 keeps even the unlit words (incl. blue ones) above 3:1.
          { opacity: 0.62 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: desk ? 'top top' : 'top 75%',
              end: desk ? '+=110%' : 'bottom 45%',
              scrub: true,
              pin: !!desk,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section className="statement" id={id} ref={rootRef}>
      <div className="wrap">
        <Chip label={label}>How I work</Chip>
        <p className="scrub">
          {words(statement.before, false, 'a')}
          {words(statement.highlight, true, 'b')}
          {words(statement.after, false, 'c')}
        </p>
        <p className="sig">— {statement.signature}</p>
      </div>
    </section>
  );
}
