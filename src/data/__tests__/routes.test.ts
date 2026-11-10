import { describe, expect, it } from 'vitest';

import routes, { navRoutes } from '../routes';

describe('routes', () => {
  it('lists Work, About, Resume and Contact in nav order', () => {
    expect(navRoutes({ hasPosts: false }).map((r) => r.label)).toEqual([
      'Work',
      'About',
      'Resume',
      'Contact',
    ]);
  });

  it('shows Writing only once there is a post', () => {
    expect(navRoutes({ hasPosts: true }).map((r) => r.path)).toContain(
      '/writing',
    );
    expect(navRoutes({ hasPosts: false }).map((r) => r.path)).not.toContain(
      '/writing',
    );
  });

  it('has unique, rooted paths and no removed pages', () => {
    const paths = routes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((p) => p.startsWith('/'))).toBe(true);
    expect(paths).not.toContain('/stats');
    expect(paths).not.toContain('/projects');
  });
});
