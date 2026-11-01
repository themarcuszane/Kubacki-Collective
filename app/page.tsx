import Link from 'next/link';
import { ArrowDown, ArrowRight, Check, ChevronRight, Compass, LayoutGrid, ListFilter, LockKeyhole, SlidersHorizontal, Target, Workflow } from 'lucide-react';
import { Brand } from '@/components/brand';
import { buttonClassName } from '@/components/ui/button';

const steps = [
  { number: '01', icon: Target, title: 'Define your next move', description: 'Set your target role, salary range, and the things that matter to you.', status: 'Start here' },
  { number: '02', icon: LayoutGrid, title: 'See the whole picture', description: 'A dedicated home for your profile and search preferences.', status: 'Your workspace' },
  { number: '03', icon: Workflow, title: 'Build your momentum', description: 'Opportunity tracking and a stage-based pipeline are up next.', status: 'Coming next' }
];

export default function HomePage() {
  return (
    <div className="site-container">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="flex min-h-24 flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] py-5">
        <Brand />
        <nav aria-label="Main navigation" className="flex items-center gap-2 max-[379px]:w-full max-[379px]:justify-between sm:gap-5">
          <a href="#how-it-works" className="hidden text-sm text-slate-400 transition hover:text-white md:block">How it works</a>
          <Link href="/sign-in" className={buttonClassName({ variant: 'ghost', size: 'sm' })}>Sign In</Link>
          <Link href="/sign-up" className={buttonClassName({ size: 'sm' })}>Get Started <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section aria-labelledby="hero-title" className="grid items-center gap-14 py-16 sm:py-20 lg:min-h-[640px] lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
          <div>
            <p className="mb-7 inline-flex items-center gap-2.5 text-xs font-medium tracking-wide text-sky-200">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_#7dd3fc80]" /> A little less noise. A lot more direction.
            </p>
            <h1 id="hero-title" className="max-w-xl text-[clamp(3.1rem,5.5vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-white">
              Your next move.<br /><span className="text-sky-300">In focus.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
              Give your job search a home. Get clear on what you want, save your preferences, and take the next step with intention.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link href="/sign-up" className={buttonClassName({ size: 'lg' })}>Get Started <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
              <a href="#how-it-works" className="inline-flex items-center gap-2 py-3 text-sm font-medium text-slate-300 hover:text-white">Take a look <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" /></a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-slate-400"><LockKeyhole aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" /> A personal workspace, built around you.</p>
          </div>

          <div className="relative min-w-0">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-full bg-sky-400/[0.06] blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 bg-[#101a2b] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
                <span className="flex items-center gap-2 text-xs font-medium text-slate-300"><Compass aria-hidden="true" className="h-4 w-4 text-sky-300" /> Your workspace</span>
                <span className="rounded-md border border-slate-700 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">Preview</span>
              </div>
              <div className="p-5 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-3">
                  <div><p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">A fresh start</p><h2 className="mt-1.5 text-xl font-semibold tracking-tight text-white">Make room for what’s next.</h2></div>
                  <div className="rounded-full border border-sky-300/20 bg-sky-300/10 p-2 text-sky-300"><Target aria-hidden="true" className="h-5 w-5" /></div>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-slate-950/35 p-5">
                  <div className="mb-5 flex items-center justify-between text-xs"><span className="font-medium text-slate-200">Your search profile</span><SlidersHorizontal aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" /></div>
                  <dl className="space-y-4 text-sm">
                    <div className="flex justify-between gap-3"><dt className="text-slate-400">Target role</dt><dd className="font-medium text-slate-200">Product designer</dd></div>
                    <div className="flex justify-between gap-3"><dt className="text-slate-400">Work style</dt><dd className="font-medium text-slate-200">Remote first</dd></div>
                    <div className="flex flex-wrap justify-between gap-3 border-t border-white/[0.06] pt-4"><dt className="text-slate-400">Priorities</dt><dd className="flex gap-1.5"><span className="rounded-md bg-sky-300/10 px-2 py-1 text-xs text-sky-200">Good people</span><span className="rounded-md bg-sky-300/10 px-2 py-1 text-xs text-sky-200">Meaningful work</span></dd></div>
                  </dl>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-sky-300/15 bg-sky-300/[0.04] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-300/10 text-sky-300"><Check aria-hidden="true" className="h-4 w-4" /></span>
                  <div className="flex-1"><p className="text-sm font-medium text-slate-200">Clarity comes first.</p><p className="mt-0.5 text-xs leading-5 text-slate-400">Start with what matters. Build from there.</p></div>
                  <ChevronRight aria-hidden="true" className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-4 text-center text-[11px] text-slate-400">Illustrative profile · your preferences make it yours</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" aria-labelledby="steps-title" className="scroll-mt-8 border-t border-white/[0.07] py-12 sm:py-16">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
            <div><p className="eyebrow">A more intentional search</p><h2 id="steps-title" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">A clear place to begin.</h2></div>
            <span className="flex items-center gap-2 text-xs text-slate-400"><ListFilter aria-hidden="true" className="h-3.5 w-3.5" /> Less scattered. More considered.</span>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map(({ number, icon: Icon, title, description, status }) => (
              <div key={number} className="border-t border-slate-800 pt-5">
                <div className="mb-5 flex items-center justify-between"><Icon aria-hidden="true" className="h-5 w-5 text-sky-300" /><span className="font-mono text-xs text-slate-400">{number}</span></div>
                <h3 className="text-base font-medium text-white">{title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{description}</p>
                <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-slate-400">{status}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] py-7 text-xs text-slate-400">
        <span>CareerOS <span className="mx-2 text-slate-700">/</span> A clearer way forward.</span>
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white">Your workspace <ArrowRight aria-hidden="true" className="h-3 w-3" /></Link>
      </footer>
    </div>
  );
}
