import Link from 'next/link';
import Mark from '@/components/Mark';
import Reveal from '@/components/Reveal';
import { theme } from '@/lib/theme';

export default function HomePage() {
  return (
    <main
      className="u-grain"
      style={{
        maxWidth: theme.containers.content,
        margin: '0 auto',
        padding: `${theme.sectionPadding.y} ${theme.sectionPadding.x}`
      }}
    >
      <Reveal variant="fadeIn">
        <Mark size={42} title="Kubacki Collective mark" className="mb-8" />
      </Reveal>
      <Reveal variant="slowReveal" delay={0.1}>
        <h1
          style={{
            fontSize: theme.typography.display,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            maxWidth: '18ch'
          }}
        >
          Kubacki Collective
        </h1>
      </Reveal>
      <Reveal delay={0.24}>
        <p
          style={{
            marginTop: theme.spacing.lg,
            fontSize: theme.typography.body,
            color: 'color-mix(in srgb, var(--color-off-white) 82%, var(--color-charcoal) 18%)',
            maxWidth: '48ch',
            lineHeight: 1.6
          }}
        >
          A quiet system for objects, stories, and atmosphere.
        </p>
      </Reveal>
      <Reveal delay={0.32}>
        <nav
          style={{
            marginTop: theme.spacing.xl,
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.md,
            fontSize: theme.typography.small,
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          <Link href="/collective">Collective</Link>
          <Link href="/chapters">Chapters</Link>
          <Link href="/journal">Journal</Link>
        </nav>
      </Reveal>
    </main>
  );
}
