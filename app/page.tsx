import Link from 'next/link';
import { HomeHero } from '@/components/home/hero';

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#12100f] text-[#f2eee6]">
      <HomeHero />
      <section id="manifesto" className="border-t border-white/15">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:px-10 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#c2a77a]">The point of view</p>
            <h2 className="display-serif mt-5 max-w-lg text-4xl leading-tight md:text-5xl">Build with taste.<br />Ship with intent.</h2>
          </div>
          <div className="max-w-lg space-y-5 text-base leading-8 text-white/65">
            <p>Kubacki Collective is built on deliberate style, quiet execution, and the long, unfinished ritual of getting things exactly right.</p>
            <p>The clothes are part of it. So are the places, the stories, and the character you bring to an ordinary day. Look sharp. Stay loyal. Keep going.</p>
            <Link href="/chapters" className="inline-flex min-h-11 items-center text-sm text-[#f2eee6] hover:text-[#d7c19c]">Explore the work <span aria-hidden="true" className="ml-3">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
