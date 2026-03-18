import Link from 'next/link';
import { AppPageShell } from '@/components/app-page-shell';
import { AppShellCard } from '@/components/app-shell-card';
import { buttonClassName } from '@/components/ui/button';
import { getCurrentProfile } from '@/lib/profile';
import { redirect } from 'next/navigation';

export default async function OpportunitiesPage() {
  const { profileComplete } = await getCurrentProfile();

  if (!profileComplete) {
    redirect('/onboarding');
  }

  return (
    <AppPageShell
        eyebrow="Opportunities"
        title="Opportunity tracker"
        description="A clean home for sourced roles, applications, and the next wave of opportunity records."
        action={
          <Link href="/dashboard" className={buttonClassName({ variant: 'secondary' })}>
            Back to dashboard
          </Link>
        }
        contentClassName="space-y-8"
      >
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <AppShellCard
          title="Empty state"
          description="The structure is ready for the first opportunity table and detail views."
        >
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-6">
            <p className="text-sm leading-7 text-slate-400">
              No opportunities yet. This page will eventually hold tracked roles, stage, company, compensation, and notes.
            </p>
            <div className="mt-5 grid gap-2 text-sm text-slate-500">
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-3">
                <span>Tracked roles</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 px-4 py-3">
                <span>Active applications</span>
                <span>0</span>
              </div>
            </div>
          </div>
        </AppShellCard>

        <AppShellCard
          title="Planned fields"
          description="A small, v1-friendly foundation for future records."
        >
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">Role title</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">Company</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">Status</li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">Applied date</li>
          </ul>
        </AppShellCard>
      </div>
    </AppPageShell>
  );
}
