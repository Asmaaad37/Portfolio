'use client';

import { useEffect, useRef } from 'react';

import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery';

const GAP = 26;
const RADIUS = 150;
const PARALLAX = 0.35;

/**
 * Interactive dot grid behind every page (M17), ported from the prototype.
 * Dots near a mouse cursor swell, brighten and push away; the grid drifts
 * with scroll. It only redraws when something changed, never while the tab
 * is hidden, and is drawn once and left still under reduced motion.
 */
export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let mx = 0;
    let my = 0;
    let pointerIn = false;
    let dotColor = '#57564F';
    let hotColor = '#1E2BD1';
    const interactive = fine && !reduced;

    const readColors = () => {
      const cs = getComputedStyle(document.body);
      dotColor = cs.getPropertyValue('--muted').trim() || dotColor;
      hotColor = cs.getPropertyValue('--accent').trim() || hotColor;
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      const offset = reduced ? 0 : (window.scrollY * PARALLAX) % GAP;
      const active = interactive && pointerIn;

      // Resting dots share one path and one fill; only dots near the cursor
      // are drawn individually.
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      const hot: [number, number, number, number][] = [];
      for (let y = -offset; y < height + GAP; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          if (active) {
            const dx = x - mx;
            const dy = y - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < RADIUS) {
              const heat = 1 - d / RADIUS;
              const push = heat * heat * 14;
              hot.push([
                x + (dx / (d || 1)) * push,
                y + (dy / (d || 1)) * push,
                1 + heat * 1.8,
                heat,
              ]);
              continue;
            }
          }
          ctx.moveTo(x + 1, y);
          ctx.arc(x, y, 1, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      for (const [x, y, r, heat] of hot) {
        ctx.globalAlpha = 0.28 + heat * 0.6;
        ctx.fillStyle = heat > 0.05 ? hotColor : dotColor;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const schedule = () => {
      if (!frame && document.visibilityState === 'visible') {
        frame = requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
      pointerIn = true;
      schedule();
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) {
        pointerIn = false;
        schedule();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') schedule();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    // Body colour tokens change when the page flips into the blue work zone.
    const themeObserver = new MutationObserver(() => {
      readColors();
      schedule();
    });
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    readColors();
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) {
      window.addEventListener('scroll', schedule, { passive: true });
    }
    if (interactive) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerout', onPointerOut);
    }

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, [reduced, fine]);

  return <canvas ref={canvasRef} className="bg-dots" aria-hidden="true" />;
}
