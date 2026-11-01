import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Brand } from '@/components/brand';

export function AuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="site-container flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="flex min-h-24 items-center justify-between gap-4 border-b border-white/[0.07]">
        <Brand />
        <Link href="/" className="inline-flex items-center gap-2 py-2 text-xs text-slate-400 hover:text-white"><ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Back to home</Link>
      </header>
      <main id="main-content" tabIndex={-1} className="grid flex-1 items-center gap-9 py-10 sm:py-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Your next chapter starts here</p>
          <h1 className="mt-5 max-w-md text-3xl font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-400">{description}</p>
          <ul className="mt-8 hidden space-y-4 border-t border-slate-800 pt-7 text-sm text-slate-400 lg:block">
            {['A space that’s yours', 'Preferences that put you first', 'A clearer starting point'].map((item) => <li key={item} className="flex items-center gap-3"><Check aria-hidden="true" className="h-4 w-4 text-sky-300" />{item}</li>)}
          </ul>
        </div>
        <div className="mx-auto w-full max-w-md [&>div]:w-full">{children}</div>
      </main>
      <footer className="border-t border-white/[0.07] py-6 text-xs text-slate-500">CareerOS <span className="mx-2 text-slate-700">/</span> A clearer way forward.</footer>
    </div>
  );
}
