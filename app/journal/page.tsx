import Link from 'next/link';
import { listJournal } from '@/lib/content';
import { theme } from '@/lib/theme';

export default function JournalPage() {
  const entries = listJournal();

  return (
    <main
      style={{
        maxWidth: theme.containers.content,
        margin: '0 auto',
        padding: `${theme.sectionPadding.y} ${theme.sectionPadding.x}`
      }}
    >
      <h1
        style={{
          fontSize: theme.typography.headline,
          letterSpacing: '-0.01em',
          lineHeight: 1.05
        }}
      >
        Journal
      </h1>
      <ul
        style={{
          marginTop: theme.spacing.xl,
          display: 'grid',
          gap: theme.spacing.md,
          listStyle: 'none',
          padding: 0
        }}
      >
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link href={`/journal/${entry.slug}`}>{entry.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
