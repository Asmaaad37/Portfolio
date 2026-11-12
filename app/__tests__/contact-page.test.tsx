import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ContactPage from '../contact/page';

const EMAIL = 'asmaadsaeed03@gmail.com';

function mockClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn(writeText) },
  });
  return navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
}

describe('contact page', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard');
  });

  it('shows the email as text and uses no mailto links', () => {
    const { container } = render(<ContactPage />);
    expect(screen.getByText(EMAIL)).toBeInTheDocument();
    expect(container.querySelector('a[href^="mailto:"]')).toBeNull();
  });

  it('links to LinkedIn and GitHub only', () => {
    const { container } = render(<ContactPage />);
    const section = container.querySelector('#contact');
    const external = Array.from(
      section?.querySelectorAll<HTMLAnchorElement>('a[href^="http"]') ?? [],
    ).map((a) => a.href);
    expect(external).toEqual([
      'https://www.linkedin.com/in/asmaadsaeed/',
      'https://github.com/Asmaaad37',
    ]);
  });

  it('copies the email from the Copy button and says so', async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    render(<ContactPage />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Copy email/ }));
    });

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(screen.getByRole('status')).toHaveTextContent(
      `Email copied: ${EMAIL}`,
    );
    expect(
      screen.getByRole('button', { name: /Copied email/ }),
    ).toBeInTheDocument();
  });

  it('copies from the big "Let\'s talk." heading button too', async () => {
    const writeText = mockClipboard(() => Promise.resolve());
    render(<ContactPage />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: "Let's talk." }));
    });

    expect(writeText).toHaveBeenCalledWith(EMAIL);
  });

  it('selects the email for manual copy when the clipboard is blocked', async () => {
    mockClipboard(() => Promise.reject(new Error('denied')));
    render(<ContactPage />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Copy email/ }));
    });

    expect(window.getSelection()?.toString()).toBe(EMAIL);
    expect(screen.getByRole('status')).toHaveTextContent(
      `Press Ctrl/⌘+C to copy: ${EMAIL}`,
    );
  });
});
