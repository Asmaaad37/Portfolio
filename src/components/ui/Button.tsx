'use client';

import Link from 'next/link';
import { type ReactNode, useRef } from 'react';

import { useMagnetic } from '@/hooks/useMagnetic';

import { ArrowRightIcon } from './icons';

type Variant = 'solid' | 'outline' | 'glass';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Round icon-only button; `label` becomes the accessible name. */
  icon?: boolean;
  label?: string;
  /** Adds the round arrow badge (rotates on hover). */
  arrow?: boolean;
  /** Opens in a new tab with rel=noopener. */
  external?: boolean;
  download?: boolean;
  className?: string;
}

const classes = (variant: Variant, icon?: boolean, extra?: string) =>
  [
    'btn',
    variant === 'solid' && 'solid',
    variant === 'glass' && 'glass',
    icon && 'icon',
    extra,
  ]
    .filter(Boolean)
    .join(' ');

/** Pill or round link button with a magnetic pull (M04). */
export function ButtonLink({
  href,
  children,
  variant = 'outline',
  icon,
  label,
  arrow,
  external,
  download,
  className,
}: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);

  const content = (
    <>
      {children}
      {arrow && (
        <span className="circ">
          <ArrowRightIcon />
        </span>
      )}
    </>
  );
  const shared = {
    ref,
    className: classes(variant, icon, className),
    'aria-label': label,
  };

  // Plain <a> for external links, in-page anchors and downloads.
  if (external || download || href.startsWith('#') || href.startsWith('http')) {
    return (
      <a
        {...shared}
        href={href}
        download={download || undefined}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link {...shared} href={href}>
      {content}
    </Link>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  'aria-describedby'?: string;
}

/** Real <button> with the same look and magnetic pull. */
export function Button({
  children,
  onClick,
  variant = 'outline',
  className,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref);
  return (
    <button
      ref={ref}
      type="button"
      className={classes(variant, false, className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
