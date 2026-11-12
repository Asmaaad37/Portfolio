'use client';

import { useRef } from 'react';

import Chip from '@/components/ui/Chip';
import { figures } from '@/data/home';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';

const fmt = (v: number) => Math.round(v).toLocaleString('en-US');

/**
 * M11: figures count up when they reach the screen. The final values are in
 * the server HTML; each number reserves its final width (tabular figures) so
 * counting never shifts the layout.
 */
export default function Numbers() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const counters = gsap.utils.toArray<HTMLElement>('[data-count]');
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        for (const el of counters) {
          const end = Number(el.dataset.count);
          const state = { v: 0 };
          el.textContent = '0';
          gsap.to(state, {
            v: end,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = fmt(state.v);
            },
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        }
        return () => {
          for (const el of counters)
            el.textContent = fmt(Number(el.dataset.count));
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section className="numbers" ref={rootRef} aria-labelledby="numbers-title">
      <div className="wrap">
        <Chip label="FIG. 04">
          <span id="numbers-title">By the numbers</span>
        </Chip>
        <dl className="ngrid">
          {figures.map((f) => (
            <div className="n" key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                <strong>
                  <span
                    data-count={f.value}
                    style={{ minWidth: `${fmt(f.value).length}ch` }}
                  >
                    {fmt(f.value)}
                  </span>
                  {f.suffix && <small>{f.suffix}</small>}
                </strong>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
