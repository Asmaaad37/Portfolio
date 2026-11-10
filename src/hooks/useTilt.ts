'use client';

import { type RefObject, useEffect } from 'react';

import { FINE_POINTER, gsap, MOTION_OK } from '@/lib/motion';

/** M10: the card tilts toward a mouse cursor in 3D and settles back on leave. */
export function useTilt(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and ${FINE_POINTER}`, () => {
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, {
          rotateY: px * 12,
          rotateX: -py * 12,
          transformPerspective: 900,
          duration: 0.5,
          ease: 'power3.out',
        });
      };
      const onLeave = () => {
        gsap.to(el, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'elastic.out(1,0.5)',
        });
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
      return () => {
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerleave', onLeave);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'transform' });
      };
    });

    return () => mm.revert();
  }, [ref]);
}
