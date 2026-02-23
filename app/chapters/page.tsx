import Link from 'next/link';
import { listChapters } from '@/lib/content';

export default function ChaptersPage() {
  const chapters = listChapters();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold">Chapters</h1>
      <ul className="mt-6 space-y-2">
        {chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link className="text-blue-700 underline" href={`/chapters/${chapter.slug}`}>
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
