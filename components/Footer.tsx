import Link from 'next/link';
import { theme } from '@/lib/theme';

const navItems: Array<{ href: string; label: string }> = [
  // { href: '/chapters', label: 'Chapters' },
  // { href: '/journal', label: 'Journal' }
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid color-mix(in srgb, var(--color-off-white) 10%, transparent 90%)',
        marginTop: theme.spacing.section
      }}
    >
      <div
        style={{
          maxWidth: theme.containers.wide,
          margin: '0 auto',
          padding: `${theme.spacing.section} ${theme.sectionPadding.x}`,
          display: 'grid',
          gap: theme.spacing.xl
        }}
      >
        <p
          style={{
            fontSize: theme.typography.small,
            letterSpacing: '0.03em',
            color: 'color-mix(in srgb, var(--color-off-white) 76%, var(--color-charcoal) 24%)'
          }}
        >
          Kubacki Collective — a lifestyle creative movement.
        </p>

        <nav
          style={{
            display: 'flex',
            gap: theme.spacing.xl,
            fontSize: theme.typography.small,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            maxWidth: '28rem'
          }}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Email for quiet updates"
            style={{
              flex: 1,
              background: 'color-mix(in srgb, var(--color-charcoal) 78%, black 22%)',
              border: '1px solid color-mix(in srgb, var(--color-off-white) 14%, transparent 86%)',
              color: 'var(--color-off-white)',
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              fontSize: theme.typography.small
            }}
          />
          <button
            type="button"
            style={{
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              border: '1px solid color-mix(in srgb, var(--color-brass) 42%, transparent 58%)',
              color: 'color-mix(in srgb, var(--color-off-white) 90%, var(--color-brass) 10%)',
              fontSize: theme.typography.small,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            Join
          </button>
        </form>
      </div>
    </footer>
  );
}
