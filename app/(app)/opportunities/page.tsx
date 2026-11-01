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
        description="A home for the roles that deserve your attention."
        action={
          <Link href="/dashboard" className={buttonClassName({ variant: 'secondary' })}>
            Back to dashboard
          </Link>
        }
        contentClassName="space-y-8"
      >
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <AppShellCard
          title="Your next opportunity starts here"
          description="Opportunity tracking is coming next."
        >
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-6">
            <p className="text-sm leading-7 text-slate-400">
              Soon you’ll be able to keep roles, companies, and application details together. In the meantime, refine your search preferences so you’re ready for the right fit.
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
          title="A little more clarity"
          description="The details you’ll be able to keep in view."
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
