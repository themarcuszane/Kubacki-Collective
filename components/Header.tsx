'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Mark from '@/components/Mark';
import { theme } from '@/lib/theme';

// const navItems = [
//   { label: "Home", href: "/" },
//   { label: "Collective", href: "/collective" },
// ];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: isScrolled
          ? '1px solid color-mix(in srgb, var(--color-off-white) 10%, transparent 90%)'
          : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(14px)' : 'none',
        background: isScrolled
          ? 'color-mix(in srgb, var(--color-soft-black) 86%, transparent 14%)'
          : 'transparent',
        transition: 'background 320ms ease, border-color 320ms ease, backdrop-filter 320ms ease'
      }}
    >
      <div
        style={{
          maxWidth: theme.containers.wide,
          margin: '0 auto',
          padding: `0 ${theme.sectionPadding.x}`,
          height: isScrolled ? '4.4rem' : '5.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'height 320ms ease'
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: theme.spacing.md,
            borderBottom: 'none',
            fontSize: theme.typography.small,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <Mark size={24} title="Kubacki mark" />
          <span>Kubacki</span>
        </Link>

        {/* Navigation intentionally disabled */}
      </div>
    </header>
  );
}
