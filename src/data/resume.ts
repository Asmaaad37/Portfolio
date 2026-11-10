/**
 * Resume content, transcribed from public/resume.pdf. That PDF is the
 * source of truth: update both together and bump RESUME_UPDATED.
 */

/** ISO date the PDF was last revised. */
export const RESUME_UPDATED = '2026-11-10';
export const RESUME_PDF = '/resume.pdf';

export const summary =
  'AI Engineer and full-stack developer who ships production systems end to end: LLM and RAG pipelines, real-time ML services, and the web and mobile apps around them. Recent work includes UOSBUDDY, a verified campus network for University of Sargodha students with a hybrid-search AI study assistant, and Salah Together, an offline-first React Native family app. I build security in from day one, with row-level security, tested database policies and CI checks, and I treat reliability as seriously as model accuracy. Open to full-time AI Engineering, ML Engineering and Software Engineering roles.';

export interface Highlight {
  /** Bold lead-in, as in the PDF. */
  lead: string;
  rest: string;
}

export interface Position {
  role: string;
  company: string;
  location: string;
  /** ISO month, for <time dateTime>. */
  start: string;
  end: string;
  startLabel: string;
  endLabel: string;
  highlights: Highlight[];
}

export const experience: Position[] = [
  {
    role: 'Associate Data Scientist',
    company: 'Data Zenix',
    location: 'Karachi, Pakistan',
    start: '2025-07',
    end: '2025-08',
    startLabel: 'Jul 2025',
    endLabel: 'Aug 2025',
    highlights: [
      {
        lead: 'Built a Python pipeline',
        rest: ' joining five economic indicators into a GCP dashboard, surfacing a GDP–debt correlation and a 40% poverty trend.',
      },
      {
        lead: 'Shipped a car price model',
        rest: ' (Decision Tree, MAE 1.0) and a sales regression (R² 0.897) identifying TV spend as the main sales driver.',
      },
    ],
  },
  {
    role: 'Junior AI Engineer – Full Stack Developer',
    company: 'Sofnix Pvt. Ltd',
    location: 'Islamabad, Pakistan',
    start: '2024-07',
    end: '2024-11',
    startLabel: 'Jul 2024',
    endLabel: 'Nov 2024',
    highlights: [
      {
        lead: 'Raised internal workflow throughput by 20%',
        rest: ' with TensorFlow predictive models served through REST APIs to the production .NET Core backend.',
      },
      {
        lead: 'Lifted session retention by 15%',
        rest: ' with an LLM conversational assistant (intent classification, context management), and cut response times on high-traffic endpoints by redesigning MySQL schemas.',
      },
    ],
  },
];

export const education = {
  degree: 'Bachelor of Computer Science',
  school: 'University of Sargodha',
  schoolUrl: 'https://www.uos.edu.pk',
  grade: 'CGPA 3.65 / 4.00',
  dates: '2022 – 2026',
  coursework: [
    'OOP',
    'Data Structures & Algorithms',
    'Computer Networks',
    'Internet Architecture and Protocols',
    'Artificial Intelligence',
    'Design & Analysis of Algorithms',
    'Database Systems',
    'Operating Systems',
    'Digital Image Processing',
    'Compiler Construction',
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Languages',
    items: ['Python (advanced)', 'TypeScript', 'JavaScript', 'SQL', 'C++'],
  },
  {
    group: 'ML / AI',
    items: [
      'LLM integration',
      'RAG',
      'Conversational AI',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
    ],
  },
  {
    group: 'Backend and data',
    items: [
      'FastAPI',
      'PostgreSQL',
      'Supabase',
      'Redis',
      'MongoDB',
      'MySQL',
      'Pandas',
      'GCP',
    ],
  },
  {
    group: 'Frontend and mobile',
    items: ['Next.js', 'React', 'React Native (Expo)', 'Tailwind CSS', 'PWAs'],
  },
  {
    group: 'DevOps and testing',
    items: [
      'Docker',
      'Vercel',
      'Google Cloud Run',
      'GitHub Actions',
      'Playwright',
      'Vitest',
      'Jest',
      'pgTAP',
      'k6',
    ],
  },
  {
    group: 'Soft skills',
    items: [
      'Team leadership',
      'Cross-functional communication',
      'Technical documentation',
    ],
  },
];

/** Projects that appear on the resume, linked to their case studies. */
export const resumeProjects = [
  'uosbuddy',
  'salah-together',
  'uos-assistant',
  'visual-document-search',
  'wavr',
];

export const leadership: Highlight[] = [
  {
    lead: 'Department Representative, University of Sargodha',
    rest: ' — founded and led 7 student societies (Programming, Data Science, Event Management, Media, Sports, E-Gaming, Performing Arts, Blood Donation Welfare), managing cross-functional teams and large-scale events including a department dinner for 600+ students.',
  },
  {
    lead: 'Best Student Award',
    rest: ' — awarded for academic excellence at college level.',
  },
  { lead: 'Member, GDG Pakistan', rest: '.' },
];

export interface Certification {
  name: string;
  issuer: string;
  detail: string;
  links: { label: string; href: string }[];
}

export const certifications: Certification[] = [
  {
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Coursera · 8 courses',
    detail:
      'End-to-end data analysis curriculum covering SQL, R, Tableau and stakeholder reporting.',
    links: [
      {
        label: 'Badge',
        href: 'https://www.credly.com/badges/c614bd5a-63db-4539-b2f6-492e8dacc362/public_url',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/posts/asmaadsaeed_google-certified-data-analyst-activity-7367613767637024770-lt7B',
      },
    ],
  },
  {
    name: 'IBM AI Engineer Professional Certificate',
    issuer: 'Coursera · 8 courses',
    detail:
      'Supervised and unsupervised learning, deep learning with Keras, PyTorch and TensorFlow, LLM application development, RAG, generative AI agents, computer vision, and ML pipelines on Apache Spark.',
    links: [
      {
        label: 'Certificates',
        href: 'https://github.com/Asmaaad37/Coursera',
      },
    ],
  },
  {
    name: 'Deloitte Australia Data Analytics Simulation',
    issuer: 'Forage · Feb 2026',
    detail:
      'Analysed forensic datasets, built a Tableau dashboard surfacing anomalous transaction patterns, and presented findings as a business memo.',
    links: [
      {
        label: 'Credential',
        href: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6982c91f58e5dbbf3c3df852_1771517619911_completion_certificate.pdf',
      },
    ],
  },
  {
    name: 'WorldQuant University Applied Data Science',
    issuer: 'WorldQuant University',
    detail:
      'Eight end-to-end projects spanning time series, NLP and classification modelling.',
    links: [
      {
        label: 'Badge',
        href: 'https://www.credly.com/badges/0b975a0c-14d7-4f15-b51e-c572ef2b52b0/public_url',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/posts/asmaadsaeed_certificate-applied-ds-lab-wqu-activity-7362233375094464515-ZSWo',
      },
    ],
  },
];
