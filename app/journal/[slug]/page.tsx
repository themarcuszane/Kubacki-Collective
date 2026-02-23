import { notFound } from 'next/navigation';
import { journalMdxBySlug } from '@/content/journal';
import { getJournalBySlug, listJournal } from '@/lib/content';

export function generateStaticParams() {
  return listJournal().map((entry) => ({ slug: entry.slug }));
}

export default function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = getJournalBySlug(params.slug);
  if (!entry) notFound();

  const MDXContent = journalMdxBySlug[entry.slug];
  if (!MDXContent) notFound();

  return (
    <article className="prose mx-auto max-w-3xl px-6 py-16">
      <MDXContent />
    </article>
  );
}
