import { describe, expect, it } from 'vitest';

import { caseStudies, getCaseStudy } from '../caseStudies';

describe('caseStudies', () => {
  it('lists the projects in the agreed order', () => {
    expect(caseStudies.map((s) => s.title)).toEqual([
      'UOSBUDDY',
      'Salah Together',
      'UOS Assistant',
      'Fraud Detection API',
      'Visual Document Search',
      'Wavr',
    ]);
  });

  it('has unique, URL-safe slugs', () => {
    const slugs = caseStudies.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  it('gives every case study the full spec: problem, approach, result, stack, links', () => {
    for (const s of caseStudies) {
      expect(s.problem.length).toBeGreaterThan(20);
      expect(s.approach.length).toBeGreaterThan(0);
      expect(s.result.length).toBeGreaterThan(10);
      expect(s.stack.length).toBeGreaterThan(0);
      expect(s.links.length).toBeGreaterThan(0);
      for (const link of s.links) expect(link.href).toMatch(/^https:\/\//);
    }
  });

  it('shows no figure for the Fraud Detection API until one is confirmed', () => {
    expect(getCaseStudy('fraud-detection-api')?.metric).toBeUndefined();
  });

  it('only counts up numeric metrics, to their displayed value', () => {
    for (const s of caseStudies) {
      if (s.metric?.count !== undefined) {
        expect(String(s.metric.count)).toBe(s.metric.value);
      }
    }
  });

  it('returns undefined for an unknown slug', () => {
    expect(getCaseStudy('nope')).toBeUndefined();
  });
});
