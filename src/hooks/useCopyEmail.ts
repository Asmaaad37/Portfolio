'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { EMAIL } from '@/data/site';

export type CopyState = 'idle' | 'copied' | 'selected';

/**
 * Copies the email to the clipboard. If the Clipboard API is unavailable or
 * blocked, selects the email text in `selectTarget` so the visitor can press
 * Ctrl/⌘+C. The state resets after a moment.
 */
export function useCopyEmail(resetAfter = 2200) {
  const [state, setState] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (selectTarget?: HTMLElement | null) => {
      let next: CopyState = 'copied';
      try {
        await navigator.clipboard.writeText(EMAIL);
      } catch {
        next = 'selected';
        if (selectTarget) {
          const range = document.createRange();
          range.selectNodeContents(selectTarget);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }
      setState(next);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setState('idle'), resetAfter);
    },
    [resetAfter],
  );

  return { state, copy };
}
