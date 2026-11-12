/** About page copy. Facts come from the resume (public/resume.pdf). */

export const aboutIntro = [
  "I'm Asmaad, an AI engineer and full-stack developer from Sargodha, Pakistan. I ship production systems end to end: LLM and RAG pipelines, real-time ML services, and the web and mobile apps around them.",
  'I build security in from day one, with row-level security, tested database policies and CI checks, and I treat reliability as seriously as model accuracy.',
];

export interface NowRow {
  label: string;
  value: string;
  href?: string;
}

/** "Now" panel (folded in from the old Stats page). */
export const now: NowRow[] = [
  { label: 'Building', value: 'UOSBUDDY', href: '/work/uosbuddy' },
  {
    label: 'Studying',
    value: 'BS Computer Science, University of Sargodha · 2022–2026',
  },
  {
    label: 'Open to',
    value:
      'Full-time AI Engineering, ML Engineering and Software Engineering roles',
  },
];
