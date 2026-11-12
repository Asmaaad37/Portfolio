import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ResumePage from '../resume/page';

describe('resume page', () => {
  it('renders every section on one page, with an index linking to each', () => {
    render(<ResumePage />);
    const index = screen.getByRole('navigation', { name: 'Resume sections' });
    const links = within(index).getAllByRole('link');

    expect(links.map((l) => l.textContent?.replace(/^\d+/, ''))).toEqual([
      'Summary',
      'Experience',
      'Education',
      'Skills',
      'Projects',
      'Leadership',
      'Certifications',
    ]);
    for (const link of links) {
      const id = link.getAttribute('href')?.slice(1) ?? '';
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it('offers the PDF download and shows when it was last updated', () => {
    render(<ResumePage />);
    const download = screen.getByRole('link', { name: /Download PDF/ });
    expect(download).toHaveAttribute('href', '/resume.pdf');
    expect(download).toHaveAttribute('download');
    expect(screen.getByText(/Last updated/)).toHaveTextContent(
      'Last updated 10 Nov 2026',
    );
  });

  it('shows the experience content, not empty tabs', () => {
    render(<ResumePage />);
    expect(
      screen.getByRole('heading', { name: 'Associate Data Scientist' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Raised internal workflow throughput/),
    ).toBeVisible();
  });
});
