import Link from 'next/link';
import { AppPageShell } from '@/components/app-page-shell';
import { AppShellCard } from '@/components/app-shell-card';
import { buttonClassName } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCurrentProfile } from '@/lib/profile';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { user, profile, profileComplete } = await getCurrentProfile();

  if (!profileComplete) {
    redirect('/onboarding');
  }

  const focusAreas = [
    {
      label: 'Auth',
      value: 'Ready',
      detail: 'Protected workspace is live.'
    },
    {
      label: 'Profile',
      value: profileComplete ? 'Saved' : 'Needs setup',
      detail: profileComplete ? 'Preferences are stored in Supabase.' : 'Finish onboarding to personalize your workspace.'
    },
    {
      label: 'Pipeline',
      value: 'Skeleton',
      detail: 'Structure is ready for status views.'
    }
  ];

  return (
    <AppPageShell
        eyebrow="Dashboard"
        title={profile?.full_name ? `Welcome back, ${profile.full_name}` : 'Your command center'}
        description="A calm home base for your search. Keep profile context, opportunities, and pipeline structure visible without extra noise."
        action={
          <Link href="/onboarding" className={buttonClassName({ variant: 'secondary' })}>
            {profileComplete ? 'Edit profile' : 'Finish onboarding'}
          </Link>
        }
        contentClassName="space-y-8"
      >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-800/80 bg-slate-900/70">
          <CardContent className="p-6">
            <div className="grid gap-5 md:grid-cols-3">
              {focusAreas.map((area) => (
                <div key={area.label} className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{area.label}</p>
                  <p className="mt-4 text-2xl font-semibold tracking-tight text-white">{area.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{area.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <AppShellCard
          title="Current profile"
          description="The saved context CareerOS uses to frame your workspace."
        >
          <dl className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Email</dt>
              <dd className="text-right text-slate-200">{user?.email ?? 'Not available'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Target role</dt>
              <dd className="text-right text-slate-200">{profile?.target_role ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Remote preference</dt>
              <dd className="text-right text-slate-200">{profile?.remote_preference ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Salary range</dt>
              <dd className="text-right text-slate-200">
                {profile?.salary_min || profile?.salary_max
                  ? `$${profile?.salary_min?.toLocaleString() ?? '0'} - $${profile?.salary_max?.toLocaleString() ?? '0'}`
                  : 'Not set'}
              </dd>
            </div>
          </dl>
        </AppShellCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AppShellCard
          title="Opportunities"
          description="A placeholder space for sourced roles and tracked applications."
        >
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-5">
            <p className="text-sm leading-6 text-slate-400">
              No records yet. This route is ready for the first opportunity list, filters, and detail cards.
            </p>
            <Link href="/opportunities" className={buttonClassName({ variant: 'outline', size: 'sm' })}>
              Open opportunities
            </Link>
          </div>
        </AppShellCard>

        <AppShellCard
          title="Pipeline"
          description="A placeholder space for application stages, progress, and follow-up flow."
        >
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-5">
            <p className="text-sm leading-6 text-slate-400">
              The first skeleton is ready. Next we can map opportunity status into a simple stage-based pipeline.
            </p>
            <Link href="/pipeline" className={buttonClassName({ variant: 'outline', size: 'sm' })}>
              Open pipeline
            </Link>
          </div>
        </AppShellCard>
      </div>
    </AppPageShell>
  );
}
