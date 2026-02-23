import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import { theme } from '@/lib/theme';

export default function HomePage() {
  return (
    <>
      <Hero />
      <section
        id="home-intro"
        style={{
          maxWidth: theme.containers.content,
          margin: '0 auto',
          padding: `${theme.sectionPadding.y} ${theme.sectionPadding.x}`
        }}
      >
        <Reveal variant="slowReveal">
          <p
            style={{
              fontSize: theme.typography.headline,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              maxWidth: '24ch'
            }}
          >
            A collective shaped by intention, culture, and quiet signal.
          </p>
        </Reveal>
      </section>
    </>
  );
}
