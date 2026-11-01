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
    { label: 'Your direction', value: profile?.target_role ?? 'Open to possibilities', detail: 'The next role you’re working toward.' },
    { label: 'Work style', value: profile?.remote_preference?.replaceAll('-', ' ') ?? 'Flexible', detail: 'A working rhythm that fits your life.' },
    { label: 'Profile', value: 'Ready to go', detail: 'Your search preferences are saved.' }
  ];

  return (
    <AppPageShell
        eyebrow="Dashboard"
        title={profile?.full_name ? `Welcome back, ${profile.full_name}` : 'Your command center'}
        description="Your search, with a little more direction. Here’s what you’re working toward."
        action={
          <Link href="/onboarding" className={buttonClassName({ variant: 'secondary' })}>
            {profileComplete ? 'Edit profile' : 'Finish onboarding'}
          </Link>
        }
        contentClassName="space-y-8"
      >
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => (
            <Card key={area.label}>
              <CardContent className="p-5">
                <p className="eyebrow">{area.label}</p>
                <p className="mt-4 break-words text-xl font-semibold capitalize tracking-tight text-white">{area.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{area.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <AppShellCard
          title="Current profile"
          description="Your preferences at a glance."
        >
          <dl className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Email</dt>
              <dd className="min-w-0 break-words text-right text-slate-200">{user?.email ?? 'Not available'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Target role</dt>
              <dd className="min-w-0 break-words text-right text-slate-200">{profile?.target_role ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Remote preference</dt>
              <dd className="min-w-0 break-words text-right text-slate-200">{profile?.remote_preference ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Salary range</dt>
              <dd className="min-w-0 break-words text-right text-slate-200">
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
          description="Your future home for roles worth pursuing."
        >
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-5">
            <p className="text-sm leading-6 text-slate-400">
              Opportunity tracking is coming next. For now, get your profile ready so you know what to look for.
            </p>
            <Link href="/opportunities" className={buttonClassName({ variant: 'outline', size: 'sm' })}>
              View opportunities
            </Link>
          </div>
        </AppShellCard>

        <AppShellCard
          title="Pipeline"
          description="A clearer view of each step in your search."
        >
          <div className="space-y-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 p-5">
            <p className="text-sm leading-6 text-slate-400">
              Pipeline tracking is coming next, with stages from your first lead to the final decision.
            </p>
            <Link href="/pipeline" className={buttonClassName({ variant: 'outline', size: 'sm' })}>
              View pipeline
            </Link>
          </div>
        </AppShellCard>
      </div>
    </AppPageShell>
  );
}
