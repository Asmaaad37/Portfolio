'use client';

import Link from 'next/link';
import { useRef } from 'react';

import Chip from '@/components/ui/Chip';
import ProjectCard from '@/components/Work/ProjectCard';
import { caseStudies, moreWork } from '@/data/caseStudies';
import { DESKTOP, gsap, MOTION_OK, useGSAP } from '@/lib/motion';

/**
 * M09: on desktop the section pins and the cards move sideways as you scroll.
 * Below 760px, and under reduced motion, it is a plain list or grid.
 */
export default function WorkGallery() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, desk: DESKTOP }, (ctx) => {
        const { motion, desk } = ctx.conditions ?? {};
        const track = trackRef.current;
        if (!motion || !track) return;

        if (desk) {
          const distance = () =>
            Math.max(
              0,
              track.scrollWidth - document.documentElement.clientWidth,
            );
          gsap.to(track, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.7,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        } else {
          gsap.from('.card', {
            y: 50,
            autoAlpha: 0.2,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: track, start: 'top 80%' },
          });
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      className="work"
      id="work"
      ref={rootRef}
      aria-labelledby="work-title"
    >
      <div className="wrap work-head">
        <div>
          <Chip label="FIG. 03">
            Selected work · {String(caseStudies.length).padStart(2, '0')}
          </Chip>
          <h2 id="work-title">Selected work</h2>
        </div>
        <Link href="/work" className="work-all">
          All case studies →
        </Link>
      </div>
      <div className="htrack" ref={trackRef}>
        {caseStudies.map((study, i) => (
          <ProjectCard
            key={study.slug}
            study={study}
            index={i}
            total={caseStudies.length}
          />
        ))}
        <a
          className="card end"
          href={moreWork.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
        >
          <div className="row">
            <span>Everything else</span>
            <span aria-hidden="true">↗</span>
          </div>
          <h3>{moreWork.title}</h3>
          <p>{moreWork.summary}</p>
        </a>
      </div>
    </section>
  );
}
