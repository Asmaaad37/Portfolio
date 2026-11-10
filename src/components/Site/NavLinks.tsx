'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Route } from '@/data/routes';

interface NavLinksProps {
  routes: Route[];
}

export default function NavLinks({ routes }: NavLinksProps) {
  const pathname = usePathname() ?? '/';

  return (
    <nav aria-label="Main" className="top-nav glass">
      {routes.map((route) => {
        const active = pathname.startsWith(route.path);
        return (
          <Link
            key={route.path}
            href={route.path}
            aria-current={active ? 'page' : undefined}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
