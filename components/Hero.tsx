import Link from 'next/link';
import { PortraitCarousel } from '@/components/collective/PortraitCarousel';
import { homePortraits } from '@/lib/public-images';

export default function Hero() {
  return (
    <section aria-label="Kubacki Hero" className="bg-[#12100f]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-10 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-14">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-[#c2a77a]">A lifestyle creative movement</p>
          <h1 className="display-serif mt-6 text-[clamp(3.5rem,7.8vw,7.6rem)] leading-[0.92] text-[#f2eee6]">Kubacki{' '}<span className="block">Collective</span></h1>
          <div className="mt-8 h-px w-16 bg-[#c2a77a]" />
          <p className="mt-7 max-w-sm text-lg leading-relaxed text-white/75">Good taste. Quiet confidence. A point of view that comes from living.</p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.17em] text-white/50">By TeamDryBox LLC · Not for everyone.</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
            <Link href="/collective" className="inline-flex min-h-12 items-center justify-center border border-[#c2a77a] bg-[#c2a77a] px-6 text-[11px] uppercase tracking-[0.14em] text-[#12100f] hover:bg-[#dac59f]">Enter the Collective <span aria-hidden="true" className="ml-4">↗</span></Link>
            <a href="#manifesto" className="inline-flex min-h-12 items-center text-sm text-white/65 hover:text-[#f2eee6]">Our philosophy <span aria-hidden="true" className="ml-2">↓</span></a>
          </div>
        </div>
        <PortraitCarousel images={homePortraits} label="Homepage portraits" />
      </div>
    </section>
  );
}
