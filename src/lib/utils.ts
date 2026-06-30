/**
 * Shared utility functions and constants
 */

// Site configuration
export const SITE_URL = 'https://asmaaad37.github.io/Portfolio';
export const AUTHOR_NAME = 'Asmaad Saeed';
export const TWITTER_HANDLE = '@AsmaadSaeed';

// GitHub Pages project-site path prefix. next/image and next/link apply this
// automatically via next.config.ts; raw <img>/<a> tags must prefix it manually.
export const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/Portfolio' : '';

// Image dimension constants
export const AVATAR_SIZE = {
  hero: 120,
  footer: 80,
  sidebar: 200,
} as const;

export const PROJECT_IMAGE = {
  width: 600,
  height: 400,
} as const;

// Skill competency
export const MAX_COMPETENCY = 5;

/**
 * Formats a date string to a human-readable format.
 * Parses as UTC to avoid timezone shifts.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  // Parse as UTC to avoid timezone shifts
  const date = new Date(`${dateStr}T12:00:00`);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
