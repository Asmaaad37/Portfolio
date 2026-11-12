import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Matches when the visitor has not asked for reduced motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Mouse or trackpad: the only case that gets the custom cursor and hover effects. */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';
/** Pinned and horizontal scenes only run at this width and up. */
export const DESKTOP = '(min-width: 760px)';

export { gsap, ScrollTrigger, useGSAP };
