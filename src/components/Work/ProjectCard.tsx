'use client';

import Link from 'next/link';
import { useRef } from 'react';

import type { CaseStudy } from '@/data/caseStudies';
import { useTilt } from '@/hooks/useTilt';

interface ProjectCardProps {
  study: CaseStudy;
  index: number;
  total: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Square spec card with a 3D tilt (M10) and the "View ↗" cursor. */
export default function ProjectCard({ study, index, total }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useTilt(ref);

  return (
    <Link
      ref={ref}
      href={`/work/${study.slug}`}
      className="card"
      data-cursor="view"
    >
      <div className="row">
        <span>{study.category}</span>
        <span>
          {pad(index + 1)}/{pad(total)}
        </span>
      </div>
      {study.metric && (
        <>
          <div className="metric">{study.metric.value}</div>
          <div className="unit">{study.metric.unit}</div>
        </>
      )}
      <h3>{study.title}</h3>
      <p>{study.summary}</p>
      <ul className="tags" aria-label="Stack">
        {study.stack.slice(0, 4).map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </Link>
  );
}
