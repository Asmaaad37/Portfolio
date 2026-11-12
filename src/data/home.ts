/** Home page copy. Figures are all stated in the resume. */

export const heroLine = {
  before: 'AI engineer building ',
  highlight: 'LLM, RAG and real-time ML systems',
  after: ' that hold up in production.',
};

export const marqueeStack = [
  'Python',
  'FastAPI',
  'pgvector',
  'Kafka',
  'Next.js',
  'Supabase',
  'React Native',
  'Claude API',
  'Qdrant',
  'Docker',
];

/** M07: words light up on scroll. `highlight` marks the accent run. */
export const statement = {
  before: "A model is only useful once it's ",
  highlight: 'reliable, fast',
  after:
    ' and wired into something people use. So I care as much about the API, the schema and the tests as about accuracy.',
  signature: 'BS Computer Science, University of Sargodha · CGPA 3.65',
};

export interface Figure {
  value: number;
  suffix?: string;
  label: string;
}

/** M11 count-up figures. */
export const figures: Figure[] = [
  { value: 500, label: 'simulated students in UOSBUDDY load tests' },
  {
    value: 20,
    suffix: '%',
    label: 'workflow throughput gain from TensorFlow models at Sofnix',
  },
  {
    value: 15,
    suffix: '%',
    label: 'session retention lift from an LLM assistant at Sofnix',
  },
  { value: 7, label: 'student societies founded and led at university' },
];
