import SiteFooter from '@/components/Site/SiteFooter';

interface PageWrapperProps {
  children: React.ReactNode;
  hideFooter?: boolean;
  mainClassName?: string;
}

/** Page frame: the skip-link target and the footer. */
export default function PageWrapper({
  children,
  hideFooter = false,
  mainClassName,
}: PageWrapperProps) {
  return (
    <>
      <main
        id="main"
        tabIndex={-1}
        className={['page-main', mainClassName].filter(Boolean).join(' ')}
      >
        {children}
      </main>
      {!hideFooter && <SiteFooter />}
    </>
  );
}
