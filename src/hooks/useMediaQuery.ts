'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { FINE_POINTER, REDUCED_MOTION } from '@/lib/motion';

/**
 * Live media-query match. `serverValue` is used during SSR and hydration, so
 * pick the value that renders the safe, static version of a component.
 */
export function useMediaQuery(query: string, serverValue: boolean): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION, true);
}

export function useFinePointer(): boolean {
  return useMediaQuery(FINE_POINTER, false);
}
