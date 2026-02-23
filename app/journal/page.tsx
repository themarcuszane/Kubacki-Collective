import Link from 'next/link';
import { listJournal } from '@/lib/content';

export default function JournalPage() {
  const entries = listJournal();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold">Journal</h1>
      <ul className="mt-6 space-y-2">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link className="text-blue-700 underline" href={`/journal/${entry.slug}`}>
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
