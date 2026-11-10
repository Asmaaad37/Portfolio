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

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    for (const el of targets) observer.observe(el);
    return () => observer.disconnect();
  }, [sections]);

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
