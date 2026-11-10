import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageWrapper from '@/components/Template/PageWrapper';
import { ButtonLink } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { caseStudies, getCaseStudy } from '@/data/caseStudies';
import { REVISION } from '@/data/site';
import { createPageMetadata } from '@/lib/metadata';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return createPageMetadata({
    title: `${study.title}: ${study.tagline}`,
    description: study.summary,
    path: `/work/${study.slug}/`,
  });
}

const pad = (n: number) => String(n).padStart(2, '0');

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const fig = pad(index + 1);

  return (
    <PageWrapper mainClassName="bleed">
      <article className="case" aria-labelledby="case-title">
        <header className="wrap case-head">
          <nav aria-label="Breadcrumb" className="crumbs">
            <Link href="/work">Work</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{study.title}</span>
          </nav>
          <Chip label={`FIG. ${fig}`}>{study.category}</Chip>
          <h1 id="case-title" className="page-h1">
            {study.title}
          </h1>
          <p className="page-lede">{study.tagline}</p>
          <div className="fig-row fig">
            <span>
              Case study {fig}/{pad(caseStudies.length)}
            </span>
            <span>{study.stack.length} technologies</span>
            <span>Rev. {REVISION}</span>
          </div>
        </header>

        {(study.metric || study.pipeline) && (
          <div className="wrap case-figures">
            {study.metric && (
              <p className="case-metric">
                <strong>{study.metric.value}</strong>
                <span>{study.metric.unit}</span>
              </p>
            )}
            {study.pipeline && (
              <figure className="pipe-figure">
                <ol className="pipe">
                  {study.pipeline.map((stage, i) => (
                    <li key={stage}>
                      <span className="fig">{pad(i + 1)}</span>
                      {stage}
                    </li>
                  ))}
                </ol>
                <figcaption className="fig">
                  FIG. {fig}.1 — How it works
                </figcaption>
              </figure>
            )}
          </div>
        )}

        <div className="wrap case-body">
          <section className="spec" aria-labelledby="spec-problem">
            <h2 id="spec-problem">
              <span className="fig">01</span> Problem
            </h2>
            <p>{study.problem}</p>
          </section>
          <section className="spec" aria-labelledby="spec-approach">
            <h2 id="spec-approach">
              <span className="fig">02</span> Approach
            </h2>
            <ul>
              {study.approach.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>
          <section className="spec" aria-labelledby="spec-result">
            <h2 id="spec-result">
              <span className="fig">03</span> Result
            </h2>
            <p>{study.result}</p>
          </section>
          <section className="spec" aria-labelledby="spec-stack">
            <h2 id="spec-stack">
              <span className="fig">04</span> Stack
            </h2>
            <ul className="tags">
              {study.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
          <section className="spec" aria-labelledby="spec-links">
            <h2 id="spec-links">
              <span className="fig">05</span> Links
            </h2>
            <div className="ctas">
              {study.links.map((link, i) => (
                <ButtonLink
                  key={link.href}
                  href={link.href}
                  variant={i === 0 ? 'solid' : 'glass'}
                  arrow
                  external
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </ButtonLink>
              ))}
            </div>
          </section>
        </div>

        <nav className="wrap case-next" aria-label="Next case study">
          <Link
            href={`/work/${next.slug}`}
            className="next-link"
            data-cursor="view"
            data-cursor-label="Next ↗"
          >
            <span className="fig">Next case study</span>
            <span className="next-title">{next.title}</span>
            <span className="next-tagline">{next.tagline}</span>
          </Link>
        </nav>
      </article>
    </PageWrapper>
  );
}
