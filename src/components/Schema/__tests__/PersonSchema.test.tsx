import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AUTHOR_NAME, SITE_URL } from '@/lib/utils';
import PersonSchema from '../PersonSchema';

describe('PersonSchema', () => {
  it('renders a script tag with JSON-LD content', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeInTheDocument();
  });

  it('contains Person schema type', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('Person');
  });

  it('uses correct author name from constants', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data.name).toBe(AUTHOR_NAME);
  });

  it('uses correct site URL from constants', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data.url).toBe(SITE_URL);
    expect(data.image).toBe(`${SITE_URL}/images/me.jpg`);
  });

  it('includes social links in sameAs', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data.sameAs).toBeDefined();
    expect(Array.isArray(data.sameAs)).toBe(true);
    expect(data.sameAs.length).toBeGreaterThan(0);
  });

  it('does not claim a current employer', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data.worksFor).toBeUndefined();
    expect(data.jobTitle).toBe('AI Engineer');
  });

  it('links LinkedIn and GitHub only', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data.sameAs).toEqual([
      'https://www.linkedin.com/in/asmaadsaeed/',
      'https://github.com/Asmaaad37',
    ]);
  });

  it('includes the university as alumniOf', () => {
    const { container } = render(<PersonSchema />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    const data = JSON.parse(script?.innerHTML || '{}');

    expect(data.alumniOf['@type']).toBe('CollegeOrUniversity');
    expect(data.alumniOf.name).toBe('University of Sargodha');
  });
});
