export interface Route {
  label: string;
  path: string;
  /** Only shown once content/writing has at least one published post. */
  needsPosts?: boolean;
}

const routes: Route[] = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Resume', path: '/resume' },
  { label: 'Writing', path: '/writing', needsPosts: true },
  { label: 'Contact', path: '/contact' },
];

export function navRoutes({ hasPosts }: { hasPosts: boolean }): Route[] {
  return routes.filter((route) => hasPosts || !route.needsPosts);
}

export default routes;
