import Link from 'next/link';
import Reveal from '@/components/Reveal';
import StaggerGroup from '@/components/StaggerGroup';
import { listChapters } from '@/lib/content';
import { theme } from '@/lib/theme';

export default function ChaptersPage() {
  const chapters = listChapters();

  return (
    <section
      style={{
        maxWidth: theme.containers.content,
        margin: '0 auto',
        padding: `${theme.sectionPadding.y} ${theme.sectionPadding.x}`
      }}
    >
      <Reveal variant="fadeIn">
        <h1
          style={{
            fontSize: theme.typography.headline,
            letterSpacing: '-0.01em',
            lineHeight: 1.05
          }}
        >
          Chapters
        </h1>
      </Reveal>
      <StaggerGroup
        className="mt-14"
        style={{
          display: 'grid',
          gap: theme.spacing.lg,
          listStyle: 'none',
          padding: 0,
          marginBottom: 0
        }}
      >
        {chapters.map((chapter, index) => (
          <li key={chapter.slug}>
            <Reveal variant="fadeUp" delay={index * 0.04}>
              <Link
                href={`/chapters/${chapter.slug}`}
                style={{
                  display: 'inline-block',
                  fontSize: theme.typography.body,
                  letterSpacing: '0.02em'
                }}
              >
                {String(chapter.chapterNumber).padStart(2, '0')} / {chapter.title}
              </Link>
            </Reveal>
          </li>
        ))}
      </StaggerGroup>
    </section>
  );
}
