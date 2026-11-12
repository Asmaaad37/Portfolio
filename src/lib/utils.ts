/**
 * Shared utility functions and constants
 */

// Site configuration
export const SITE_URL = 'https://asmaadsaeed.vercel.app';
export const AUTHOR_NAME = 'Asmaad Saeed';
export const TWITTER_HANDLE = '@AsmaadSaeed';

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
