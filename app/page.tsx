import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, LayoutDashboard, Sparkles } from 'lucide-react';
import { buttonClassName } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="border-none text-lg font-semibold tracking-tight text-white">
          CareerOS
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className={buttonClassName({ variant: 'ghost' })}>
            Sign In
          </Link>
          <Link href="/sign-up" className={buttonClassName({})}>
            Get Started
          </Link>
        </div>
      </header>

      <section className="flex flex-1 items-center py-16">
        <div className="grid w-full gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
              <Sparkles className="h-4 w-4" />
              Organize your search, pipeline, and momentum in one place
            </div>
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">CareerOS</p>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Your AI Job Search Command Center
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Track opportunities, manage your pipeline, and keep your career search moving without
                scattered spreadsheets or sticky-note systems.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up" className={buttonClassName({ size: 'lg' })}>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sign-in" className={buttonClassName({ size: 'lg', variant: 'secondary' })}>
                Sign In
              </Link>
            </div>
          </div>

          <Card className="border-slate-800/80 bg-slate-900/75 shadow-2xl shadow-sky-950/30 backdrop-blur">
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-sky-500/10 p-2 text-sky-300">
                      <LayoutDashboard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Job Search Overview</p>
                      <p className="text-sm text-slate-400">One home for progress, priorities, and focus.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-300">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Opportunity Pipeline</p>
                      <p className="text-sm text-slate-400">Keep every lead, application, and follow-up visible.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-slate-200">Built for a calmer, sharper search</p>
                  <div className="grid gap-3 text-sm text-slate-400">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                      Personalized onboarding profile
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                      Protected workspace for your search data
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
                      Clean dashboard, opportunities, pipeline, and settings
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
