import type { Metadata } from 'next';

import PageWrapper from '@/components/Template/PageWrapper';
import { ButtonLink } from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
});

export default function NotFound() {
  return (
    <PageWrapper mainClassName="bleed">
      <header className="wrap page-head not-found">
        <Chip label="FIG. 404">Page not found</Chip>
        <h1 className="page-h1">Lost.</h1>
        <p className="page-lede">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="ctas">
          <ButtonLink href="/" variant="solid" arrow>
            Go home
          </ButtonLink>
          <ButtonLink href="/work" variant="glass">
            See the work
          </ButtonLink>
        </div>
      </header>
    </PageWrapper>
  );
}
