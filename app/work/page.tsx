import type { Metadata } from 'next';

import DarkZone from '@/components/Home/DarkZone';
import PageWrapper from '@/components/Template/PageWrapper';
import Chip from '@/components/ui/Chip';
import MoreWorkCard from '@/components/Work/MoreWorkCard';
import ProjectCard from '@/components/Work/ProjectCard';
import { caseStudies } from '@/data/caseStudies';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Work',
  description:
    'Selected work by Asmaad Saeed: LLM and RAG systems, real-time ML services, and the web and mobile apps around them.',
  path: '/work/',
});

const count = String(caseStudies.length).padStart(2, '0');

export default function WorkPage() {
  return (
    <PageWrapper mainClassName="bleed">
      <header className="wrap page-head">
        <Chip label="FIG. 03">Selected work · {count}</Chip>
        <h1 className="page-h1">Work</h1>
        <p className="page-lede">
          Systems I&apos;ve built, from LLM and RAG pipelines to real-time and
          mobile apps. Each one has a short case study: the problem, the
          approach and the result.
        </p>
      </header>
      <DarkZone>
        <section className="work-index" aria-label="Case studies">
          <div className="wrap work-grid">
            {caseStudies.map((study, i) => (
              <ProjectCard
                key={study.slug}
                study={study}
                index={i}
                total={caseStudies.length}
              />
            ))}
            <MoreWorkCard />
          </div>
        </section>
      </DarkZone>
    </PageWrapper>
  );
}
