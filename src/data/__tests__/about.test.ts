import { describe, expect, it } from 'vitest';

import { aboutIntro, now } from '../about';

describe('about data', () => {
  it('has a short intro', () => {
    expect(aboutIntro.length).toBeGreaterThan(0);
    expect(aboutIntro.join(' ')).toContain('AI engineer');
  });

  it('folds the old Stats "now" info into About', () => {
    const labels = now.map((row) => row.label);
    expect(labels).toEqual(['Building', 'Studying', 'Open to']);
    expect(now.find((r) => r.label === 'Building')?.href).toBe(
      '/work/uosbuddy',
    );
  });
});
