'use client';

import { useEffect } from 'react';

interface UADataBrand {
  brand: string;
}

/**
 * Shared SVG displacement filter for the liquid-glass refraction (M16), plus
 * one delegated listener that moves the specular highlight on any .glass
 * element under the mouse. Refraction is only switched on in Chromium, the
 * one engine that supports SVG filters in backdrop-filter; Safari and Firefox
 * keep the frosted blur from glass.css.
 */
export default function GlassFilter() {
  useEffect(() => {
    const html = document.documentElement;
    const brands: UADataBrand[] =
      (navigator as Navigator & { userAgentData?: { brands: UADataBrand[] } })
        .userAgentData?.brands ?? [];
    if (
      brands.some((b) => /Chromium|Google Chrome|Microsoft Edge/.test(b.brand))
    ) {
      html.classList.add('lg-refract');
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as Element | null)?.closest?.(
        '.glass',
      ) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty(
        '--gx',
        `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`,
      );
      el.style.setProperty(
        '--gy',
        `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
      );
    };
    document.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      html.classList.remove('lg-refract');
      document.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute' }}
      aria-hidden="true"
      focusable="false"
    >
      <filter
        id="lg-distort"
        x="0"
        y="0"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008 0.012"
          numOctaves={2}
          seed={7}
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="soft"
          scale={38}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
