import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { getCaseStudy } from '../caseStudies';
import {
  certifications,
  experience,
  RESUME_PDF,
  RESUME_UPDATED,
  resumeProjects,
  skills,
} from '../resume';

describe('resume data', () => {
  it('points at a PDF that exists in public/', () => {
    expect(existsSync(path.join(process.cwd(), 'public', RESUME_PDF))).toBe(
      true,
    );
  });

  it('has a valid last-updated date', () => {
    expect(RESUME_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(RESUME_UPDATED))).toBe(false);
  });

  it('lists both positions, most recent first', () => {
    expect(experience.map((j) => j.company)).toEqual([
      'Data Zenix',
      'Sofnix Pvt. Ltd',
    ]);
    expect(experience[0].start > experience[1].start).toBe(true);
  });

  it('keeps the resume figures', () => {
    const text = experience
      .flatMap((j) => j.highlights.map((h) => h.lead + h.rest))
      .join(' ');
    for (const figure of ['20%', '15%', 'MAE 1.0', 'R² 0.897', '40%']) {
      expect(text).toContain(figure);
    }
  });

  it('links every resume project to a case study', () => {
    for (const slug of resumeProjects) {
      expect(getCaseStudy(slug)).toBeDefined();
    }
  });

  it('has skill groups and linked certifications', () => {
    expect(skills.length).toBeGreaterThan(3);
    for (const cert of certifications) {
      expect(cert.links.length).toBeGreaterThan(0);
      for (const link of cert.links) expect(link.href).toMatch(/^https:\/\//);
    }
  });
});
