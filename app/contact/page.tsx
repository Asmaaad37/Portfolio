import type { Metadata } from 'next';

import ContactBlock from '@/components/Home/ContactBlock';
import LocalClock from '@/components/Site/LocalClock';
import PageWrapper from '@/components/Template/PageWrapper';
import { now } from '@/data/about';
import { LOCATION } from '@/data/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Asmaad Saeed: email asmaadsaeed03@gmail.com, or find him on LinkedIn and GitHub.',
  path: '/contact/',
});

const openTo = now.find((row) => row.label === 'Open to')?.value;

export default function ContactPage() {
  return (
    <PageWrapper mainClassName="bleed">
      <ContactBlock id="contact" label="FIG. 06" asPageTitle />
      <section className="wrap now contact-details" aria-label="Details">
        <dl className="now-grid">
          {openTo && (
            <div>
              <dt>Open to</dt>
              <dd>{openTo}</dd>
            </div>
          )}
          <div>
            <dt>Based in</dt>
            <dd>
              {LOCATION.city}
              <span className="fig now-coords">
                {LOCATION.coords} · <LocalClock prefix="" />
              </span>
            </dd>
          </div>
          <div>
            <dt>Response time</dt>
            <dd>Within a day</dd>
          </div>
        </dl>
      </section>
    </PageWrapper>
  );
}
