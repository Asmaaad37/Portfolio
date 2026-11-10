'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';

import { ButtonLink } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { GitHubIcon } from '@/components/ui/icons';
import { heroLine } from '@/data/home';
import { GITHUB_URL, LOCATION, REVISION } from '@/data/site';
import { useStretchName } from '@/hooks/useStretchName';
import { gsap, MOTION_OK, useGSAP } from '@/lib/motion';

import Waveform from './Waveform';

const NAME_LINES = ['Asmaad', 'Saeed'];

/** Letters are split on the server so the intro (M02, CSS) and stretch (M15) need no re-render. */
function NameLine({
  text,
  offset,
  dot,
}: {
  text: string;
  offset: number;
  dot?: boolean;
}) {
  const chars = [...text];
  return (
    <span className="line" aria-hidden="true">
      {chars.map((c, i) => (
        <span
          key={i}
          className="ch"
          style={{ '--i': offset + i } as CSSProperties}
        >
          <span className="ch-g">{c}</span>
        </span>
      ))}
      {dot && (
        <span
          className="ch dot"
          style={{ '--i': offset + chars.length } as CSSProperties}
        >
          <span className="ch-g">.</span>
        </span>
      )}
    </span>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  useStretchName(nameRef);

  // M05: the name drifts up slower than the page.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(nameRef.current, {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section className="hero" ref={rootRef} aria-labelledby="hero-name">
      <div className="hero-glow" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="wrap">
        <div className="hero-top">
          <Chip>AI engineer · full-stack</Chip>
          <Chip>LLM · RAG · real-time ML</Chip>
        </div>
        <h1
          id="hero-name"
          className="hero-name"
          ref={nameRef}
          aria-label="Asmaad Saeed"
        >
          <NameLine text={NAME_LINES[0]} offset={0} />
          <NameLine text={NAME_LINES[1]} offset={NAME_LINES[0].length} dot />
        </h1>
        <div className="fig-row fig">
          <span>FIG. 01 — Asmaad Saeed, AI engineer</span>
          <span>
            {LOCATION.coords} · {LOCATION.city}
          </span>
          <span>Rev. {REVISION}</span>
        </div>
        <div className="hero-row">
          <p>
            {heroLine.before}
            <em>{heroLine.highlight}</em>
            {heroLine.after}
          </p>
          <div className="ctas">
            <ButtonLink href="#work" variant="solid" arrow>
              See the work
            </ButtonLink>
            <ButtonLink href="#contact" variant="glass">
              Get in touch
            </ButtonLink>
            <ButtonLink
              href={GITHUB_URL}
              variant="glass"
              icon
              label="GitHub"
              external
            >
              <GitHubIcon />
            </ButtonLink>
          </div>
        </div>
        <Waveform />
        <div className="scroll-hint" aria-hidden="true">
          <i />
          Scroll
        </div>
      </div>
    </section>
  );
}
