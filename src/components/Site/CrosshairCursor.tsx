'use client';

import { useEffect, useRef } from 'react';

import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery';

const pad = (n: number) => String(Math.max(0, Math.round(n))).padStart(4, '0');

/**
 * Crosshair cursor with page coordinates (M01). Mounts only for a mouse or
 * trackpad; touch devices never render it and keep the native cursor.
 * Grows on links and buttons, becomes "View ↗" on [data-cursor="view"].
 */
export default function CrosshairCursor() {
  const fine = useFinePointer();
  if (!fine) return null;
  return <Crosshair />;
}

function Crosshair() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const h = hRef.current;
    const v = vRef.current;
    const coord = coordRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot || !h || !v || !coord || !label) return;

    const html = document.documentElement;
    html.classList.add('has-cursor');

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let seen = false;
    let frame = 0;

    const follow = () => {
      frame = 0;
      if (reduced) {
        rx = mx;
        ry = my;
      } else {
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
      }
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        frame = requestAnimationFrame(follow);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        rx = mx;
        ry = my;
        seen = true;
      }
      dot.style.transform = `translate(${mx}px,${my}px)`;
      h.style.transform = `translateY(${my}px)`;
      v.style.transform = `translateX(${mx}px)`;
      coord.style.transform = `translate(${mx}px,${my}px)`;
      coord.textContent = `X ${pad(mx)} · Y ${pad(my + window.scrollY)}`;
      root.classList.remove('is-hidden');
      if (!frame) frame = requestAnimationFrame(follow);
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        '[data-cursor], a, button, label, input, select, textarea, summary',
      ) as HTMLElement | null;
      const view = target?.dataset.cursor === 'view';
      root.classList.toggle('is-view', view);
      root.classList.toggle('is-link', !!target && !view);
      label.textContent = target?.dataset.cursorLabel ?? 'View ↗';
    };

    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) root.classList.add('is-hidden');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);

    return () => {
      cancelAnimationFrame(frame);
      html.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="cursor is-hidden" aria-hidden="true">
      <div ref={hRef} className="c-h" />
      <div ref={vRef} className="c-v" />
      <div ref={ringRef} className="c-ring">
        <span ref={labelRef} className="c-label">
          View ↗
        </span>
      </div>
      <div ref={dotRef} className="c-dot" />
      <div ref={coordRef} className="c-coord">
        X 0000 · Y 0000
      </div>
    </div>
  );
}
