'use client';

import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useReducedMotion } from '@/hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '@/lib/motion';

let activeLenis: Lenis | null = null;

/** The running Lenis instance, or null under reduced motion. */
export function getLenis(): Lenis | null {
  return activeLenis;
}

/**
 * Scroll to an element with the fixed header (and any extra sticky bar)
 * cleared. Smooth through Lenis when it runs, instant otherwise.
 */
export function scrollToElement(el: HTMLElement, extraOffset = 0) {
  const header = document.querySelector<HTMLElement>('.top');
  const offset = (header?.offsetHeight ?? 0) + extraOffset + 16;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  if (activeLenis) activeLenis.scrollTo(y, { duration: 1.2 });
  else window.scrollTo({ top: y });
}

/** Lenis inertia scrolling (M14), driven by the GSAP ticker. Off under reduced motion. */
export default function SmoothScroll() {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstPath = useRef(true);

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      autoRaf: false,
      anchors: { offset: -90 },
    });
    lenisRef.current = lenis;
    activeLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Fonts change line lengths; re-measure pins and triggers once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, [reduced]);

  // New page: jump to the top without a smooth glide, then re-measure triggers.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (!window.location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    }
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
