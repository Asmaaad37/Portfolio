import { GITHUB_URL } from './site';

/**
 * Selected work, in display order. Every figure here is stated in the resume
 * (Designs/M. Asmaad Saeed - resume.pdf). Projects without a confirmed figure
 * have no `metric`.
 */
export interface CaseStudyLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  metric?: {
    /** Display string, e.g. "500" or "<1s". */
    value: string;
    /** Set when the value should count up from zero (M11). */
    count?: number;
    unit: string;
  };
  summary: string;
  problem: string;
  approach: string[];
  result: string;
  stack: string[];
  links: CaseStudyLink[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'uosbuddy',
    title: 'UOSBUDDY',
    tagline: 'Verified campus network with an AI study buddy',
    category: 'Full-stack · AI',
    metric: {
      value: '500',
      count: 500,
      unit: 'simulated students in load tests',
    },
    summary:
      'Verified campus network for University of Sargodha students, with an AI study assistant on hybrid search.',
    problem:
      'University of Sargodha students needed one place to find batchmates, ask for help and study together, where every account belongs to a verified student.',
    approach: [
      'Built solo as a mobile-first PWA: students verify enrolment, find batchmates and connect through a feed, chats and help requests.',
      'The AI study assistant pairs hybrid search (pgvector plus full-text, merged with reciprocal rank fusion) with Claude.',
      'Security from day one: row-level security and in-database rate limits.',
    ],
    result:
      'Tested with pgTAP for database policies, Playwright end to end, and k6 load tests with 500 simulated students.',
    stack: [
      'Next.js',
      'TypeScript',
      'Supabase',
      'pgvector',
      'Claude API',
      'Redis',
    ],
    links: [{ label: 'Live app', href: 'https://uosbuddy.vercel.app/' }],
  },
  {
    slug: 'salah-together',
    title: 'Salah Together',
    tagline: 'Offline-first family prayer tracker',
    category: 'Mobile',
    metric: {
      value: '±1 min',
      unit: 'prayer times vs AlAdhan, computed offline',
    },
    summary:
      'Family prayer tracker with on-device prayer times, streaks and a live family dashboard.',
    problem:
      'A family prayer tracker has to work without a connection: prayer times, logging and reminders all need to run on the device.',
    approach: [
      'Cross-platform React Native (Expo) app that computes prayer times offline, within one minute of AlAdhan.',
      'Logging, streaks and reminders on the device.',
      'Family circles sync through an offline outbox to a live Supabase Realtime dashboard.',
    ],
    result: 'Secured with row-level security and tested with Jest in CI.',
    stack: ['React Native (Expo)', 'TypeScript', 'Supabase', 'Zustand'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Asmaaad37/salah-together' },
    ],
  },
  {
    slug: 'uos-assistant',
    title: 'UOS Assistant',
    tagline: 'AI inbound calling agent',
    category: 'Voice AI',
    metric: { value: '4', count: 4, unit: 'person team, architected and led' },
    summary:
      'Urdu voice agent for university calls: speech-to-text, RAG, GPT-4o Mini and text-to-speech.',
    problem:
      'Inbound calls to the university need answers in natural Urdu, grounded in the university’s own information.',
    approach: [
      'Architected and led a four-person team building an end-to-end voice calling agent.',
      'Calls flow through Google STT → FastAPI → a RAG pipeline (OpenAI embeddings + PostgreSQL/pgvector) → GPT-4o Mini → Google TTS.',
      'Urdu-language intent classification and context-aware responses.',
    ],
    result:
      'An end-to-end voice agent that handles inbound calls with natural Urdu intent classification and contextually aware response generation.',
    stack: ['Python', 'FastAPI', 'OpenAI', 'pgvector', 'Google STT/TTS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Asmaaad37/UOS-ASSISTANT' },
    ],
  },
  {
    slug: 'fraud-detection-api',
    title: 'Fraud Detection API',
    tagline: 'Streaming fraud scoring',
    category: 'MLOps',
    summary:
      'Kafka stream scoring card transactions with a tuned Isolation Forest.',
    problem:
      'Card transactions need to be scored for fraud as they stream in, not in a nightly batch.',
    approach: [
      'Transactions arrive on a Kafka stream and are scored by a tuned Isolation Forest.',
      'Packaged with Docker.',
    ],
    result: 'A full write-up with results is coming soon.',
    stack: ['Kafka', 'Scikit-learn', 'Docker'],
    links: [{ label: 'GitHub', href: GITHUB_URL }],
  },
  {
    slug: 'visual-document-search',
    title: 'Visual Document Search',
    tagline: 'No-OCR multimodal RAG',
    category: 'Multimodal RAG',
    metric: { value: '0', unit: 'OCR steps' },
    summary:
      'PDF pages embedded as images with ColQwen2, retrieved in Qdrant, answered by Gemini.',
    problem:
      'OCR-based retrieval fails on scanned documents, tables and charts, so answers built on it miss what is on the page.',
    approach: [
      'Uploaded PDF pages are embedded directly as patch-level visual embeddings with ColQwen2 (ColPali family).',
      'Qdrant stores and retrieves them with native MaxSim multi-vector search.',
      'Retrieved page images go to Gemini 2.0 Flash for grounded answers, with full observability through Langfuse.',
    ],
    result:
      'Document search and Q&A with no OCR step, removing OCR-induced retrieval failures on scanned documents, tables and charts.',
    stack: [
      'ColQwen2',
      'Qdrant',
      'FastAPI',
      'Gemini',
      'LangChain',
      'Google Cloud Run',
    ],
    links: [
      {
        label: 'Walkthrough',
        href: 'https://github.com/Asmaaad37/visual-doc-search',
      },
    ],
  },
  {
    slug: 'wavr',
    title: 'Wavr',
    tagline: 'Real-time chat application',
    category: 'Real-time',
    metric: { value: '<1s', unit: 'message delivery' },
    summary: 'MERN chat app with Firebase auth and zero-polling live presence.',
    problem:
      'A chat app has to deliver messages and show who is online instantly, without clients polling the server.',
    approach: [
      'Production real-time messaging on a MERN stack.',
      'Firebase Authentication for JWT-based user identity.',
      'Socket.io for message delivery and live presence.',
    ],
    result:
      'Sub-second message delivery and zero-polling live presence tracking across concurrent users.',
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Firebase'],
    links: [{ label: 'GitHub', href: 'https://github.com/Asmaaad37/wavr' }],
  },
];

export const moreWork = {
  title: 'More on GitHub',
  summary: 'DeepFake detection, an Uber data pipeline on GCP, and experiments.',
  href: GITHUB_URL,
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
