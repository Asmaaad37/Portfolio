import type { Metadata } from 'next';
import Link from 'next/link';

import ResumeIndex from '@/components/Resume/ResumeIndex';
import PageWrapper from '@/components/Template/PageWrapper';
import { ButtonLink } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { DownloadIcon } from '@/components/ui/icons';
import { getCaseStudy } from '@/data/caseStudies';
import {
  certifications,
  education,
  experience,
  leadership,
  RESUME_PDF,
  RESUME_UPDATED,
  resumeProjects,
  skills,
  summary,
} from '@/data/resume';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Resume',
  description:
    'Resume of Asmaad Saeed, AI engineer and full-stack developer: experience at Sofnix and Data Zenix, projects, skills and certifications.',
  path: '/resume/',
});

const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'certifications', label: 'Certifications' },
];

const updated = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(RESUME_UPDATED));

function SectionHeading({ id, label }: { id: string; label: string }) {
  const n = sections.findIndex((s) => s.id === id) + 1;
  return (
    <h2 id={`${id}-title`} tabIndex={-1}>
      <span className="fig">{String(n).padStart(2, '0')}</span> {label}
    </h2>
  );
}

export default function ResumePage() {
  const projects = resumeProjects
    .map((slug) => getCaseStudy(slug))
    .filter((p) => p !== undefined);

  return (
    <PageWrapper mainClassName="bleed">
      <header className="wrap page-head">
        <Chip label="FIG. 07">Resume</Chip>
        <h1 className="page-h1">Resume</h1>
        <div className="resume-actions">
          <ButtonLink href={RESUME_PDF} variant="solid" download>
            Download PDF
            <DownloadIcon />
          </ButtonLink>
          <p className="fig">
            Last updated <time dateTime={RESUME_UPDATED}>{updated}</time>
          </p>
        </div>
      </header>

      <div className="wrap resume-layout">
        <ResumeIndex sections={sections} />

        <div className="resume-body">
          <section
            id="summary"
            className="r-sec"
            aria-labelledby="summary-title"
          >
            <SectionHeading id="summary" label="Summary" />
            <p className="r-summary">{summary}</p>
          </section>

          <section
            id="experience"
            className="r-sec"
            aria-labelledby="experience-title"
          >
            <SectionHeading id="experience" label="Experience" />
            {experience.map((job) => (
              <article className="r-item" key={job.company}>
                <header className="r-item-head">
                  <h3>{job.role}</h3>
                  <p>
                    {job.company} · {job.location}
                  </p>
                  <p className="fig">
                    <time dateTime={job.start}>{job.startLabel}</time>
                    {' – '}
                    <time dateTime={job.end}>{job.endLabel}</time>
                  </p>
                </header>
                <ul>
                  {job.highlights.map((h) => (
                    <li key={h.lead}>
                      <strong>{h.lead}</strong>
                      {h.rest}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section
            id="education"
            className="r-sec"
            aria-labelledby="education-title"
          >
            <SectionHeading id="education" label="Education" />
            <article className="r-item">
              <header className="r-item-head">
                <h3>{education.degree}</h3>
                <p>
                  <a
                    href={education.schoolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {education.school}
                  </a>{' '}
                  · {education.grade}
                </p>
                <p className="fig">{education.dates}</p>
              </header>
              <p className="r-label">Coursework</p>
              <ul className="tags">
                {education.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>
          </section>

          <section id="skills" className="r-sec" aria-labelledby="skills-title">
            <SectionHeading id="skills" label="Skills" />
            <dl className="r-skills">
              {skills.map((row) => (
                <div key={row.group}>
                  <dt>{row.group}</dt>
                  <dd>{row.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            id="projects"
            className="r-sec"
            aria-labelledby="projects-title"
          >
            <SectionHeading id="projects" label="Projects" />
            <ul className="r-projects">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`}>
                    <strong>{p.title}</strong>
                    <span>{p.tagline}</span>
                    <span className="fig">
                      {p.stack.slice(0, 4).join(' · ')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="leadership"
            className="r-sec"
            aria-labelledby="leadership-title"
          >
            <SectionHeading id="leadership" label="Leadership" />
            <ul className="r-list">
              {leadership.map((h) => (
                <li key={h.lead}>
                  <strong>{h.lead}</strong>
                  {h.rest}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="certifications"
            className="r-sec"
            aria-labelledby="certifications-title"
          >
            <SectionHeading id="certifications" label="Certifications" />
            {certifications.map((c) => (
              <article className="r-item" key={c.name}>
                <header className="r-item-head">
                  <h3>{c.name}</h3>
                  <p className="fig">{c.issuer}</p>
                </header>
                <p>{c.detail}</p>
                <ul className="r-links">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {l.label} ↗
                        <span className="sr-only">
                          {' '}
                          for {c.name} (opens in a new tab)
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
