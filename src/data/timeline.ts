/** Experience timeline (M12), shown on the home and About pages. */
export interface TimelineItem {
  time: string;
  title: string;
  body: string;
  now?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    time: 'Now',
    title: 'Building UOSBUDDY',
    body: 'Solo full-stack and AI build: a verified campus network for University of Sargodha students.',
    now: true,
  },
  {
    time: 'Jul–Aug 2025',
    title: 'Associate Data Scientist · Data Zenix',
    body: 'A Python pipeline into a GCP dashboard, a car price model (MAE 1.0) and a sales regression (R² 0.897).',
  },
  {
    time: 'Jul–Nov 2024',
    title: 'Junior AI Engineer · Sofnix',
    body: 'An LLM conversational assistant (+15% session retention) and TensorFlow models behind a .NET Core API (+20% workflow throughput).',
  },
  {
    time: '2022–2026',
    title: 'BS Computer Science · University of Sargodha',
    body: 'CGPA 3.65. IBM AI Engineer and Google Data Analytics certified.',
  },
];
