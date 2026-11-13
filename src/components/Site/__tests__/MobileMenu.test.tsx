import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MobileMenu from '../MobileMenu';

const routes = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

describe('MobileMenu', () => {
  it('starts closed with the sheet hidden', () => {
    render(<MobileMenu routes={routes} />);
    const button = screen.getByRole('button', { name: /Menu/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: 'Main' })).toBeNull();
  });

  it('opens to show every page link and the socials', () => {
    render(<MobileMenu routes={routes} />);
    fireEvent.click(screen.getByRole('button', { name: /Menu/ }));

    const button = screen.getByRole('button', { name: /Close/ });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(
      within(nav)
        .getAllByRole('link')
        .map((a) => a.textContent),
    ).toEqual(['01Work', '02About', '03Resume', '04Contact']);
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/ })).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('menu-open');
  });

  it('closes on Escape and on choosing the current page', () => {
    render(<MobileMenu routes={routes} />);
    const open = () =>
      fireEvent.click(screen.getByRole('button', { name: /Menu/ }));

    open();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(document.documentElement).not.toHaveClass('menu-open');

    // Other pages close it through the route change; the current page
    // (usePathname is mocked as "/") closes it directly.
    cleanup();
    render(<MobileMenu routes={[{ label: 'Home', path: '/' }, ...routes]} />);
    open();
    fireEvent.click(screen.getByRole('link', { name: /Home/ }));
    expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('marks the current page', () => {
    // vitest.setup mocks usePathname() as "/", so no link is current there.
    render(<MobileMenu routes={[{ label: 'Home', path: '/' }, ...routes]} />);
    fireEvent.click(screen.getByRole('button', { name: /Menu/ }));
    expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: /Work/ })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
