import type { Metadata } from 'next';

import ContactBlock from '@/components/Home/ContactBlock';
import DarkZone from '@/components/Home/DarkZone';
import Hero from '@/components/Home/Hero';
import Marquee from '@/components/Home/Marquee';
import Numbers from '@/components/Home/Numbers';
import Statement from '@/components/Home/Statement';
import Timeline from '@/components/Home/Timeline';
import WorkGallery from '@/components/Home/WorkGallery';
import { PersonSchema } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';

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
