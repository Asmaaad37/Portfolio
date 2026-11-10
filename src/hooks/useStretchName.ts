'use client';

import { type RefObject, useEffect } from 'react';

import { FINE_POINTER, gsap, MOTION_OK } from '@/lib/motion';

const BASE = 62;
const PEAK = 128;

/**
 * M15: letters of the hero name widen (Anybody's wdth axis) near a mouse
 * cursor; on touch, a tap sends a gentle ripple through them.
 *
 * Markup: `.line > .ch > .ch-g`. Each `.ch` keeps a fixed layout width
 * (its width at BASE) and the extra width is applied as a translateX on the
 * glyphs that follow, so nothing reflows and no layout shift is reported.
 * Animation frames only run while something is moving.
 */
export function useStretchName(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const name = ref.current;
    if (!name) return;

    const mm = gsap.matchMedia();
    mm.add({ motion: MOTION_OK, fine: FINE_POINTER }, (ctx) => {
      const { motion, fine } = ctx.conditions ?? {};
      if (!motion) return;

      const lines = Array.from(name.querySelectorAll<HTMLElement>('.line')).map(
        (line) => Array.from(line.querySelectorAll<HTMLElement>('.ch')),
      );
      const boxes = lines.flat();
      const glyphs = boxes.map((b) => b.firstElementChild as HTMLElement);
      const wd = boxes.map(() => BASE);
      let w0: number[] = [];
      let w1: number[] = [];
      let frame = 0;
      let inView = true;

      const apply = () => {
        let i = 0;
        for (const line of lines) {
          let shift = 0;
          for (let j = 0; j < line.length; j++, i++) {
            const g = glyphs[i];
            g.style.setProperty('--wd', wd[i].toFixed(1));
            g.style.transform = shift
              ? `translateX(${shift.toFixed(1)}px)`
              : '';
            shift += ((w1[i] - w0[i]) * (wd[i] - BASE)) / (PEAK - BASE);
          }
        }
      };

      const measure = () => {
        for (const b of boxes) b.style.width = '';
        for (const g of glyphs) {
          g.style.removeProperty('--wd');
          g.style.transform = '';
        }
        w0 = glyphs.map((g) => g.offsetWidth);
        for (const g of glyphs) g.style.setProperty('--wd', String(PEAK));
        w1 = glyphs.map((g) => g.offsetWidth);
        boxes.forEach((b, i) => {
          b.style.width = `${w0[i]}px`;
        });
        apply();
      };

      /** Centre of each glyph as currently drawn. Read before any writes. */
      const centres = () => {
        let i = 0;
        const out: [number, number][] = [];
        for (const line of lines) {
          let shift = 0;
          for (let j = 0; j < line.length; j++, i++) {
            const r = boxes[i].getBoundingClientRect();
            const glyphW =
              w0[i] + ((w1[i] - w0[i]) * (wd[i] - BASE)) / (PEAK - BASE);
            out.push([r.left + shift + glyphW / 2, r.top + r.height / 2]);
            shift += glyphW - w0[i];
          }
        }
        return out;
      };

      const settle = (targets: number[], ease: number) => {
        let moving = false;
        for (let i = 0; i < wd.length; i++) {
          wd[i] += (targets[i] - wd[i]) * ease;
          if (Math.abs(targets[i] - wd[i]) > 0.2) moving = true;
          else wd[i] = targets[i];
        }
        apply();
        return moving;
      };

      // ---- mouse: proximity stretch ----
      let mx = -1e4;
      let my = -1e4;
      const mouseStep = () => {
        frame = 0;
        const c = centres();
        const targets = c.map(([cx, cy]) => {
          const dx = (cx - mx) / 220;
          const dy = (cy - my) / 260;
          return BASE + (PEAK - BASE) * Math.exp(-(dx * dx + dy * dy));
        });
        if (settle(targets, 0.14)) frame = requestAnimationFrame(mouseStep);
      };
      const onMouseMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || !inView) return;
        mx = e.clientX;
        my = e.clientY;
        if (!frame) frame = requestAnimationFrame(mouseStep);
      };
      const onMouseOut = (e: PointerEvent) => {
        if (e.relatedTarget) return;
        mx = -1e4;
        my = -1e4;
        if (!frame) frame = requestAnimationFrame(mouseStep);
      };

      // ---- touch: one ripple per tap ----
      let rippleStart = 0;
      let rippleX = 0;
      const rippleStep = (now: number) => {
        frame = 0;
        const t = (now - rippleStart) / 1000;
        const c = centres();
        const front = t * 900;
        const decay = Math.exp(-t / 0.7);
        const targets = c.map(([cx]) => {
          const d = (Math.abs(cx - rippleX) - front) / 90;
          return BASE + (PEAK - BASE) * 0.55 * decay * Math.exp(-d * d);
        });
        const moving = settle(targets, 0.25);
        if (t < 2 || moving) frame = requestAnimationFrame(rippleStep);
      };
      const onTap = (e: PointerEvent) => {
        if (e.pointerType === 'mouse') return;
        rippleX = e.clientX;
        rippleStart = performance.now();
        if (!frame) frame = requestAnimationFrame(rippleStep);
      };

      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
      });
      io.observe(name);

      let resizeTimer = 0;
      const onResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(measure, 150);
      };

      measure();
      document.fonts?.ready.then(measure);
      window.addEventListener('resize', onResize);
      const hero = name.closest('section') ?? name;
      if (fine) {
        window.addEventListener('pointermove', onMouseMove, { passive: true });
        document.addEventListener('pointerout', onMouseOut);
      } else {
        hero.addEventListener('pointerdown', onTap as EventListener, {
          passive: true,
        });
      }

      return () => {
        cancelAnimationFrame(frame);
        window.clearTimeout(resizeTimer);
        io.disconnect();
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onMouseMove);
        document.removeEventListener('pointerout', onMouseOut);
        hero.removeEventListener('pointerdown', onTap as EventListener);
        for (const b of boxes) b.style.width = '';
        for (const g of glyphs) {
          g.style.removeProperty('--wd');
          g.style.transform = '';
        }
      };
    });

    return () => mm.revert();
  }, [ref]);
}
