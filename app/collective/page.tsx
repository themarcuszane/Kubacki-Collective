import Link from 'next/link';
import { PortraitCarousel } from '@/components/collective/PortraitCarousel';
import { collectivePortraits } from '@/lib/public-images';

export default function CollectivePage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-[#12100f] text-[#f2eee6]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 md:px-10 lg:pb-24 lg:pt-14">
        <div className="mb-10 grid gap-5 border-b border-white/15 pb-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#c2a77a]">Meet the collective</p>
            <h1 className="display-serif mt-4 max-w-xl text-5xl leading-[1.02] md:text-6xl">Character comes first.</h1>
          </div>
          <p className="max-w-md text-base leading-7 text-white/65">Deliberate style, quiet execution, and the long, unfinished ritual of getting things exactly right.</p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <PortraitCarousel images={collectivePortraits} label="Collective portraits" />
          <div className="lg:py-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c2a77a]">The story behind the style</p>
            <h2 className="display-serif mt-5 text-4xl leading-tight md:text-5xl">Look sharp.<br />Stay loyal.<br />Keep going.</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-white/70">
              <p>Kubacki Collective is a lifestyle creative movement. It is built on personal character, good taste, and the small rituals that make a life your own.</p>
              <p>He can, on occasion, twirl a Butterfinger into his mouth from across the room—an oddly specific talent he treats with appropriate seriousness. From barstool to toolbox, style travels with him.</p>
              <p>And then there is the garage. Seventeen years of sorting, sweeping, reorganizing, and declaring victory.</p>
            </div>
            <blockquote className="display-serif my-8 border-l border-[#c2a77a] pl-5 text-3xl leading-snug text-[#d7c19c]">The garage remains undefeated.<br />He remains committed.</blockquote>
            <p className="text-sm leading-7 text-white/60">The clothing collective is coming soon. Until then, explore the work, the thinking, and the stories behind it.</p>
            <div className="mt-7 flex flex-wrap gap-6 border-t border-white/15 pt-6">
              <Link href="/chapters" className="inline-flex min-h-11 items-center text-sm text-[#f2eee6] hover:text-[#d7c19c]">Explore the chapters <span aria-hidden="true" className="ml-3">↗</span></Link>
              <Link href="/journal" className="inline-flex min-h-11 items-center text-sm text-white/65 hover:text-[#f2eee6]">Read the journal <span aria-hidden="true" className="ml-3">↗</span></Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
