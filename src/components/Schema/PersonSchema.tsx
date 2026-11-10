import { education } from '@/data/resume';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '@/data/site';
import { AUTHOR_NAME, SITE_URL } from '@/lib/utils';
import JsonLd from './JsonLd';

export default function PersonSchema() {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/images/me.jpg`,
    jobTitle: 'AI Engineer',
    email: EMAIL,
    sameAs: [LINKEDIN_URL, GITHUB_URL],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sargodha',
      addressCountry: 'PK',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: education.school,
      url: education.schoolUrl,
    },
  };

  return <JsonLd data={personData} />;
}
