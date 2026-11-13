'use client';

import { type MouseEvent, useEffect, useRef, useState } from 'react';

import { scrollToElement } from '@/components/Site/SmoothScroll';

export interface ResumeSectionLink {
  id: string;
  label: string;
}

interface ResumeIndexProps {
  sections: ResumeSectionLink[];
}

/**
 * Sticky section index for the resume. Marks the section being read, and
 * on click scrolls past the fixed header and moves focus to the heading.
 */
export default function ResumeIndex({ sections }: ResumeIndexProps) {
  const [active, setActive] = useState(sections[0]?.id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length || typeof IntersectionObserver === 'undefined') return;

    // Each callback only reports sections that changed, so keep the full
    // set of sections inside the reading band and mark the first of them.
    const inBand = new Set<string>();
    const order = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        const first = order.find((id) => inBand.has(id));
        if (first) setActive(first);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

  // On phones the index is a sideways-scrolling bar: keep the current
  // section's link in view.
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({
      left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, [active]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    e.preventDefault();
    // On narrow screens the index is a sticky bar under the header.
    const nav = navRef.current;
    const barHeight =
      nav &&
      getComputedStyle(nav).position === 'sticky' &&
      window.innerWidth < 760
        ? nav.offsetHeight
        : 0;
    scrollToElement(section, barHeight);
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
    const heading = section.querySelector<HTMLElement>('h2');
    heading?.focus({ preventScroll: true });
  };

  return (
    <nav
      ref={navRef}
      className="resume-index glass"
      aria-label="Resume sections"
    >
      <ol>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? 'location' : undefined}
              onClick={(e) => onClick(e, s.id)}
            >
              <span className="fig" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
