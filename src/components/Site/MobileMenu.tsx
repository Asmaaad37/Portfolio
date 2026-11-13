'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

import { ArrowUpRightIcon } from '@/components/ui/icons';
import type { Route } from '@/data/routes';
import { GITHUB_URL, LINKEDIN_URL } from '@/data/site';

import LocalClock from './LocalClock';
import { getLenis } from './SmoothScroll';

interface MobileMenuProps {
  routes: Route[];
}

/**
 * Phone navigation (under 760px): a glass "Menu" pill that opens a
 * full-screen sheet with the page links, availability, local time and
 * socials. Closes on Escape, on choosing a link, or on the button; keeps
 * keyboard focus inside while open and stops the page scrolling behind it.
 */
export default function MobileMenu({ routes }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? '/';
  const sheetId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // A new page closes the menu.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const button = buttonRef.current;
    const html = document.documentElement;

    html.classList.add('menu-open');
    getLenis()?.stop();
    sheet?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !sheet || !button) return;
      // Keep focus on the button and the sheet's links while open.
      const focusables = [
        button,
        ...sheet.querySelectorAll<HTMLElement>('a[href], button'),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      html.classList.remove('menu-open');
      getLenis()?.start();
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-btn glass"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <span className="menu-icon" aria-hidden="true" />
      </button>

      <div
        id={sheetId}
        ref={sheetRef}
        className="menu-sheet"
        data-open={open || undefined}
        hidden={!open}
      >
        <nav aria-label="Main">
          <ol className="menu-links">
            {routes.map((route, i) => {
              const active = pathname.startsWith(route.path);
              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    aria-current={active ? 'page' : undefined}
                    // The route change closes the menu; closing here would
                    // hide the link mid-click. Same page: just close.
                    onClick={active ? () => setOpen(false) : undefined}
                  >
                    <span className="fig" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {route.label}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="menu-foot">
          <span className="avail glass">
            <span className="avail-dot" aria-hidden="true" />
            Open to roles
          </span>
          <p className="fig">
            <LocalClock className="menu-clock" />
          </p>
          <ul className="socials">
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRightIcon />
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRightIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
