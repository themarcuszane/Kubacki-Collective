'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import HeroOverlay from '@/components/HeroOverlay';
import Reveal from '@/components/Reveal';
import { theme } from '@/lib/theme';

const heroImages = [
  '/images/hero/paris-coat.jpg',
  '/images/hero/rain-neon.jpg',
  '/images/hero/snow-fire.jpg'
] as const;

const heroCycleMs = 9000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, heroCycleMs);

    return () => window.clearInterval(timer);
  }, []);

  const activeImage = useMemo(() => heroImages[activeIndex], [activeIndex]);

  return (
    <section
      aria-label="Kubacki Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
        padding: `${theme.sectionPadding.y} ${theme.sectionPadding.x}`
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <motion.div
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.06 }}
            transition={{ duration: 14, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={activeImage}
              alt="Kubacki atmospheric hero"
              fill
              priority={activeIndex === 0}
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <HeroOverlay />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '60rem' }}>
        <Reveal variant="slowReveal">
          <h1
            style={{
              fontSize: theme.typography.display,
              lineHeight: 0.9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Kubacki Collective
          </h1>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.18}>
          <p
            style={{
              marginTop: theme.spacing.lg,
              fontSize: theme.typography.body,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            A lifestyle creative movement.
          </p>
        </Reveal>

        <Reveal variant="fadeIn" delay={0.28}>
          <p
            style={{
              marginTop: theme.spacing.md,
              fontSize: theme.typography.micro,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'color-mix(in srgb, var(--color-off-white) 78%, var(--color-charcoal) 22%)'
            }}
          >
            Not for everyone.
          </p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.4}>
          <Link
            href="/collective"
            style={{
              display: 'inline-block',
              marginTop: theme.spacing.xxl,
              padding: `${theme.spacing.sm} ${theme.spacing.xl}`,
              border: '1px solid color-mix(in srgb, var(--color-off-white) 66%, transparent 34%)',
              background: 'transparent',
              color: 'var(--color-off-white)',
              fontSize: theme.typography.small,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'color 220ms ease, border-color 220ms ease, background 220ms ease'
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.borderColor =
                'color-mix(in srgb, var(--color-brass) 70%, var(--color-off-white) 30%)';
              event.currentTarget.style.color =
                'color-mix(in srgb, var(--color-off-white) 88%, var(--color-brass) 12%)';
              event.currentTarget.style.background =
                'color-mix(in srgb, var(--color-brass) 14%, transparent 86%)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.borderColor =
                'color-mix(in srgb, var(--color-off-white) 66%, transparent 34%)';
              event.currentTarget.style.color = 'var(--color-off-white)';
              event.currentTarget.style.background = 'transparent';
            }}
          >
            Enter the Collective
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
