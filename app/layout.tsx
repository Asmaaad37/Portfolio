import type { Metadata, Viewport } from 'next';
import { Anybody, Martian_Mono, Schibsted_Grotesk } from 'next/font/google';

import CrosshairCursor from '@/components/Site/CrosshairCursor';
import DotGridBackground from '@/components/Site/DotGridBackground';
import GlassFilter from '@/components/Site/GlassFilter';
import ScrollProgress from '@/components/Site/ScrollProgress';
import SiteHeader from '@/components/Site/SiteHeader';
import SmoothScroll from '@/components/Site/SmoothScroll';
import GoogleAnalytics from '@/components/Template/GoogleAnalytics';
import { AUTHOR_NAME, SITE_URL, TWITTER_HANDLE } from '@/lib/utils';
import './tailwind.css';

// Display face; the width axis drives the stretching hero name (M15).
const anybody = Anybody({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-anybody',
  display: 'swap',
});

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
});

const martian = Martian_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-martian',
  display: 'swap',
  preload: false,
});

const siteDescription =
  'AI Engineer and full-stack developer shipping LLM and RAG pipelines, real-time ML services, and the web and mobile apps around them.';

export const viewport: Viewport = {
  themeColor: '#EDECE7',
  colorScheme: 'light',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: AUTHOR_NAME,
    template: `%s | ${AUTHOR_NAME}`,
  },
  description: siteDescription,
  keywords: [
    AUTHOR_NAME,
    'AI Engineer',
    'ML Engineer',
    'full-stack developer',
    'LLM',
    'RAG',
    'FastAPI',
    'Next.js',
    'Python',
  ],
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: `${SITE_URL}/icon`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: AUTHOR_NAME,
    title: AUTHOR_NAME,
    description: siteDescription,
    images: [
      {
        url: `${SITE_URL}/images/me.jpg`,
        width: 1200,
        height: 630,
        alt: AUTHOR_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: AUTHOR_NAME,
    description: siteDescription,
    images: [`${SITE_URL}/images/me.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anybody.variable} ${schibsted.variable} ${martian.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint, so no-JS fallbacks never flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <GlassFilter />
        <DotGridBackground />
        <ScrollProgress />
        <SmoothScroll />
        <SiteHeader />
        {children}
        <CrosshairCursor />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
