import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { caseStudies } from '@/data/caseStudies';
import { SITE_URL } from '@/lib/utils';
import CaseStudyPage, {
  generateMetadata,
  generateStaticParams,
} from '../work/[slug]/page';

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

describe('case study page', () => {
  it('pre-renders one page per case study', () => {
    expect(generateStaticParams()).toEqual(
      caseStudies.map((s) => ({ slug: s.slug })),
    );
  });

  it('sets the page URL with a trailing slash', async () => {
    const metadata = await generateMetadata(params('uosbuddy'));
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/work/uosbuddy/`);
  });

  it('renders the problem, approach, result, stack and links sections', async () => {
    render(await CaseStudyPage(params('uos-assistant')));

    expect(
      screen.getByRole('heading', { level: 1, name: 'UOS Assistant' }),
    ).toBeInTheDocument();
    for (const name of ['Problem', 'Approach', 'Result', 'Stack', 'Links']) {
      expect(
        screen.getByRole('heading', { level: 2, name: new RegExp(name) }),
      ).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'href',
      'https://github.com/Asmaaad37/UOS-ASSISTANT',
    );
  });

  it('links on to the next case study, wrapping after the last', async () => {
    render(await CaseStudyPage(params('wavr')));
    const nav = screen.getByRole('navigation', { name: 'Next case study' });
    expect(within(nav).getByRole('link')).toHaveAttribute(
      'href',
      '/work/uosbuddy',
    );
  });
});
