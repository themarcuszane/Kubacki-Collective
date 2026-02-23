import { theme } from '@/lib/theme';

export default function CollectivePage() {
  return (
    <main
      style={{
        maxWidth: theme.containers.narrow,
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
        Collective
      </h1>
      <p
        style={{
          marginTop: theme.spacing.md,
          fontSize: theme.typography.body,
          color: 'color-mix(in srgb, var(--color-off-white) 84%, var(--color-charcoal) 16%)',
          lineHeight: 1.6
        }}
      >
        Collective placeholder page.
      </p>
    </main>
  );
}
