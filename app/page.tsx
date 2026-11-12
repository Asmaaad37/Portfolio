import type { Metadata } from 'next';

import dynamic from 'next/dynamic';

import Hero from '@/components/Home/Hero';
import { PersonSchema } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';

// Below-the-fold sections: still rendered to HTML, but each loads and
// hydrates as its own chunk so the first screen becomes interactive sooner.
const Marquee = dynamic(() => import('@/components/Home/Marquee'));
const Statement = dynamic(() => import('@/components/Home/Statement'));
const DarkZone = dynamic(() => import('@/components/Home/DarkZone'));
const WorkGallery = dynamic(() => import('@/components/Home/WorkGallery'));
const Numbers = dynamic(() => import('@/components/Home/Numbers'));
const Timeline = dynamic(() => import('@/components/Home/Timeline'));
const ContactBlock = dynamic(() => import('@/components/Home/ContactBlock'));

export const metadata: Metadata = {
  description:
    'Asmaad Saeed, AI engineer building LLM, RAG and real-time ML systems that hold up in production, plus the web and mobile apps around them.',
};

export default function HomePage() {
  return (
    <PageWrapper mainClassName="home">
      <PersonSchema />
      <Hero />
      <Marquee />
      <Statement id="about" />
      <DarkZone>
        <WorkGallery />
        <Numbers />
      </DarkZone>
      <Timeline />
      <ContactBlock />
    </PageWrapper>
  );
}
