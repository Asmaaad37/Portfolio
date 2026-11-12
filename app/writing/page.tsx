import type { Metadata } from 'next';
import Link from 'next/link';
import PageWrapper from '@/components/Template/PageWrapper';
import Chip from '@/components/ui/Chip';
import writing from '@/data/writing';
import { createPageMetadata } from '@/lib/metadata';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Writing',
    description:
      'Thoughts on AI engineering, machine learning, and data science by Asmaad Saeed.',
    path: '/writing/',
  }),
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

interface UnifiedItem {
  title: string;
  url: string;
  date: string;
  description: string;
  isExternal: boolean;
}

// Extracted component to reduce duplication
interface WritingItemProps {
  item: UnifiedItem;
  showDate?: boolean;
}

function WritingItem({ item, showDate = true }: WritingItemProps) {
  const content = (
    <>
      {showDate && item.date && (
        <time className="fig" dateTime={item.date}>
          {formatDate(item.date)}
        </time>
      )}
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      {item.isExternal && (
        <span className="writing-ext" aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  if (item.isExternal) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="writing-item"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.url} className="writing-item">
      {content}
    </Link>
  );
}

export default function WritingPage() {
  // Get internal posts from markdown files
  const internalPosts = getAllPosts();
  const internalItems: UnifiedItem[] = internalPosts.map((post) => ({
    title: post.title,
    url: `/writing/${post.slug}`,
    date: post.date,
    description: post.description,
    isExternal: false,
  }));

  // Get external articles from data file
  const externalItems: UnifiedItem[] = writing.map((item) => ({
    ...item,
    isExternal: true,
  }));

  // Merge and sort all items
  const allItems = [...internalItems, ...externalItems];
  const dated = allItems
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const undated = allItems.filter((item) => !item.date);

  return (
    <PageWrapper mainClassName="bleed">
      <header className="wrap page-head">
        <Chip label="FIG. 08">Writing</Chip>
        <h1 className="page-h1">Writing</h1>
        <p className="page-lede">
          Notes on AI engineering, ML pipelines and everything in between.{' '}
          <a href="/feed.xml" className="writing-rss">
            RSS feed
          </a>
        </p>
      </header>

      <div className="wrap writing-list">
        {allItems.length === 0 ? (
          <p className="writing-empty">
            Nothing here yet. The first post is on its way.
          </p>
        ) : (
          <>
            {dated.map((item) => (
              <WritingItem key={item.url} item={item} />
            ))}
            {undated.length > 0 && (
              <>
                <p className="r-label">Guides</p>
                {undated.map((item) => (
                  <WritingItem key={item.url} item={item} showDate={false} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
}
