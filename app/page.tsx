import Link from 'next/link';
import { HomeHero } from '@/components/home/hero';
import { ManifestoSection } from '@/components/home/sections';

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-black text-white">
      <HomeHero />
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-6 md:px-8">
        <p className="text-xs uppercase tracking-[0.16em] text-white/50">A lifestyle creative movement.</p>
        <Link href="/collective" className="text-sm text-white/75 hover:text-white">Explore the collective <span aria-hidden="true">→</span></Link>
      </div>
      <ManifestoSection />
    </main>
  );
}
