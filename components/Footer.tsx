import Link from 'next/link';
import Mark from '@/components/Mark';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#12100f]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8 md:py-12">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.12em]"><Mark size={24} /><span>Kubacki Collective</span></Link>
            <p className="mt-3 text-sm leading-6 text-white/60">A lifestyle creative movement.</p>
            <p className="mt-1 text-xs tracking-wide text-white/50">By TeamDryBox LLC</p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
            <Link href="/collective" className="hover:text-white">Collective</Link>
            <Link href="/chapters" className="hover:text-white">Chapters</Link>
            <Link href="/journal" className="hover:text-white">Journal</Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-white/45">© {new Date().getFullYear()} TeamDryBox LLC. All rights reserved.</div>
      </div>
    </footer>
  );
}
