import type { Metadata } from 'next';
import Link from 'next/link';

import Statement from '@/components/Home/Statement';
import Timeline from '@/components/Home/Timeline';
import LocalClock from '@/components/Site/LocalClock';
import PageWrapper from '@/components/Template/PageWrapper';
import { ButtonLink } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { aboutIntro, now } from '@/data/about';
import { leadership } from '@/data/resume';
import { LOCATION } from '@/data/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'About Asmaad Saeed: AI engineer and full-stack developer in Sargodha, Pakistan, building LLM, RAG and real-time ML systems. What he is building now and where he has worked.',
  path: '/about/',
});

export default function AboutPage() {
  return (
    <PageWrapper mainClassName="bleed">
      <header className="wrap page-head">
        <Chip label="FIG. 02">About</Chip>
        <h1 className="page-h1">About</h1>
        <div className="about-intro">
          {aboutIntro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </header>

      <section className="wrap now" aria-labelledby="now-title">
        <h2 id="now-title" className="section-label">
          <span className="fig">FIG. 02.1</span> Now
        </h2>
        <dl className="now-grid">
          {now.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>
                {row.href ? (
                  <Link href={row.href}>{row.value}</Link>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
          <div>
            <dt>Based in</dt>
            <dd>
              {LOCATION.city}
              <span className="fig now-coords">
                {LOCATION.coords} · <LocalClock prefix="" />
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <Statement label="FIG. 02.2" />
      <Timeline label="FIG. 02.3" />

      <section className="wrap beyond" aria-labelledby="beyond-title">
        <h2 id="beyond-title" className="section-label">
          <span className="fig">FIG. 02.4</span> Beyond code
        </h2>
        <ul className="r-list">
          {leadership.map((h) => (
            <li key={h.lead}>
              <strong>{h.lead}</strong>
              {h.rest}
            </li>
          ))}
        </ul>
        <div className="ctas">
          <ButtonLink href="/resume" variant="solid" arrow>
            Full resume
          </ButtonLink>
          <ButtonLink href="/contact" variant="glass">
            Get in touch
          </ButtonLink>
        </div>
      </section>
    </PageWrapper>
  );
}
