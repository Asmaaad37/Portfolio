'use client';

import { useRef } from 'react';

import { Button } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { ArrowUpRightIcon } from '@/components/ui/icons';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/data/site';
import { useCopyEmail } from '@/hooks/useCopyEmail';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';

const IDLE_HINT = 'Click to copy my email · I reply within a day';

interface ContactBlockProps {
  id?: string;
  label?: string;
  /** Render the big line as the page's h1 (Contact page) instead of an h2. */
  asPageTitle?: boolean;
}

/** M13: giant "Let's talk." fills with colour on hover; clicking copies the email. */
export default function ContactBlock({
  id = 'contact',
  label = 'FIG. 06',
  asPageTitle = false,
}: ContactBlockProps) {
  const rootRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLSpanElement>(null);
  const { state, copy } = useCopyEmail();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('.talk', {
          yPercent: 30,
          autoAlpha: 0.2,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const hint =
    state === 'copied'
      ? `Email copied: ${EMAIL}`
      : state === 'selected'
        ? `Press Ctrl/⌘+C to copy: ${EMAIL}`
        : IDLE_HINT;
  const Heading = asPageTitle ? 'h1' : 'h2';
  const hintId = `${id}-hint`;

  return (
    <section
      className="contact"
      id={id}
      ref={rootRef}
      aria-labelledby={`${id}-title`}
    >
      <div className="wrap">
        <Chip label={label}>Contact</Chip>
        <Heading id={`${id}-title`} className="talk-heading">
          <button
            type="button"
            className="talk"
            data-text="Let's talk."
            aria-describedby={hintId}
            onClick={() => copy(emailRef.current)}
          >
            Let&apos;s talk.
          </button>
        </Heading>
        <p className="talk-sub" id={hintId} role="status">
          {hint}
        </p>
        <div className="c-row">
          <div className="email">
            <span className="email-text" ref={emailRef}>
              {EMAIL}
            </span>
            <Button variant="glass" onClick={() => copy(emailRef.current)}>
              {state === 'copied'
                ? 'Copied'
                : state === 'selected'
                  ? 'Selected'
                  : 'Copy'}
              <span className="sr-only"> email address</span>
            </Button>
          </div>
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
    </section>
  );
}
