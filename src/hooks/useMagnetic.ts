'use client';

import { type RefObject, useEffect } from 'react';

import { FINE_POINTER, gsap, MOTION_OK } from '@/lib/motion';

/** M04: the element leans toward a mouse cursor and springs back on leave. */
export function useMagnetic(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * 0.35,
          y: (e.clientY - r.top - r.height / 2) * 0.45,
          duration: 0.4,
          ease: 'power3.out',
        });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' });
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'x,y' });
      };
    });

    return () => mm.revert();
  }, [ref]);
}
