'use client';

import { useEffect, useRef } from 'react';

import Chip from '@/components/ui/Chip';
import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery';

/**
 * M03: a live signal that reacts to the cursor, a nod to the voice agent.
 * The loop only runs while the canvas is on screen and the tab is visible;
 * under reduced motion it is drawn once, still.
 */
export default function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    const read = readRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !read || !ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;
    let energy = reduced ? 0.12 : 0;
    let focusX = 0.5;
    let mx = -1e4;
    let my = -1e4;
    let lastMx = mx;
    let frame = 0;
    let inView = false;
    let accent = '#1E2BD1';
    let muted = '#57564F';

    const readColors = () => {
      const cs = getComputedStyle(document.body);
      accent = cs.getPropertyValue('--accent').trim() || accent;
      muted = cs.getPropertyValue('--muted').trim() || muted;
    };

    const size = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      if (!reduced) {
        const r = canvas.getBoundingClientRect();
        const near = fine && my > r.top - 140 && my < r.bottom + 140;
        const speed = Math.abs(mx - lastMx);
        lastMx = mx;
        energy +=
          ((near ? 0.35 + Math.min(1, speed / 40) : 0.12) - energy) * 0.06;
        if (near) focusX += ((mx - r.left) / Math.max(1, W) - focusX) * 0.08;
        t += 0.035;
      }
      const layers = [
        { c: accent, w: 2.2, f: 0.018, s: 1.6, k: 1, o: 1 },
        { c: muted, w: 1, f: 0.027, s: -1.1, k: 0.6, o: 0.7 },
        { c: muted, w: 1, f: 0.011, s: 0.7, k: 0.45, o: 0.45 },
      ];
      for (const L of layers) {
        ctx.beginPath();
        ctx.strokeStyle = L.c;
        ctx.lineWidth = L.w;
        ctx.globalAlpha = L.o;
        for (let x = 0; x <= W; x += 3) {
          const d = x / W - focusX;
          const env = Math.exp(-d * d * 14);
          const y =
            H / 2 +
            Math.sin(x * L.f + t * L.s) *
              (H * 0.38) *
              energy *
              L.k *
              (0.25 + env) +
            Math.sin(x * L.f * 3.1 - t * 2) * 3 * env * energy;
          if (x) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      read.textContent = `amp ${energy.toFixed(2)} · ${Math.round(energy * 440)} Hz`;
    };

    const loop = () => {
      frame = 0;
      draw();
      if (!reduced && inView && document.visibilityState === 'visible') {
        frame = requestAnimationFrame(loop);
      }
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && inView) start();
      else stop();
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
    };
    const onResize = () => {
      size();
      start();
    };
    const themeObserver = new MutationObserver(() => {
      readColors();
      start();
    });

    readColors();
    size();
    draw();
    io.observe(canvas);
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    if (fine && !reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    return () => {
      stop();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced, fine]);

  return (
    <div className="wave-box">
      <Chip>Live signal · move your cursor</Chip>
      <span ref={readRef} className="wave-read" aria-hidden="true">
        amp 0.00 · 0 Hz
      </span>
      <canvas ref={canvasRef} className="wave" aria-hidden="true" />
    </div>
  );
}
