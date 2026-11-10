import Link from 'next/link';

import { navRoutes } from '@/data/routes';
import { getAllPosts } from '@/lib/posts';

import LocalClock from './LocalClock';
import NavLinks from './NavLinks';

/** Fixed header: logo, glass nav, local clock and availability badge. */
export default function SiteHeader() {
  const routes = navRoutes({ hasPosts: getAllPosts().length > 0 });

  return (
    <header className="top">
      <div className="wrap top-inner">
        <Link href="/" className="logo" aria-label="Asmaad Saeed, home">
          asmaad<i>/</i>
        </Link>
        <NavLinks routes={routes} />
        <div className="top-meta">
          <LocalClock />
          <span className="avail glass">Open to roles</span>
        </div>
      </div>
    </header>
  );
}
