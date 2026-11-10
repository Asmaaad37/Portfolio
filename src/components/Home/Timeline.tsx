'use client';

import { useRef } from 'react';

import Chip from '@/components/ui/Chip';
import { timeline } from '@/data/timeline';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';

interface TimelineProps {
  id?: string;
  label?: string;
  title?: string;
}

/** M12: the rail draws itself as you read down; entries slide in. */
export default function Timeline({
  id = 'experience',
  label = 'FIG. 05',
  title = 'Experience',
}: TimelineProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.tl-line',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.tl',
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          },
        );
        for (const item of gsap.utils.toArray<HTMLElement>('.tl-item')) {
          gsap.from(item, {
            x: -30,
            autoAlpha: 0.15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const headingId = `${id}-title`;

  return (
    <section
      className="timeline"
      id={id}
      ref={rootRef}
      aria-labelledby={headingId}
    >
      <div className="wrap">
        <div className="tl-head">
          <Chip label={label}>Where I&apos;ve been</Chip>
          <h2 id={headingId}>{title}</h2>
        </div>
        <div className="tl">
          <div className="tl-rail" aria-hidden="true">
            <div className="tl-line" />
          </div>
          <ol>
            {timeline.map((item) => (
              <li
                key={item.title}
                className={item.now ? 'tl-item now' : 'tl-item'}
              >
                <span className="tl-time">{item.time}</span>
                <div>
                  <h3>
                    {item.title}
                    {item.now && <span className="tl-now">Now</span>}
                  </h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
