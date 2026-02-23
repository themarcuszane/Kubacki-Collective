import { notFound } from 'next/navigation';
import { chapterMdxBySlug } from '@/content/chapters';
import { getChapterBySlug, listChapters } from '@/lib/content';

export function generateStaticParams() {
  return listChapters().map((chapter) => ({ slug: chapter.slug }));
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug);
  if (!chapter) notFound();

  const MDXContent = chapterMdxBySlug[chapter.slug];
  if (!MDXContent) notFound();

  return (
    <article className="prose mx-auto max-w-3xl px-6 py-16">
      <MDXContent />
    </article>
  );
}
