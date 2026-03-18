import Link from 'next/link';
import { AppPageShell } from '@/components/app-page-shell';
import { AppShellCard } from '@/components/app-shell-card';
import { buttonClassName } from '@/components/ui/button';
import { getCurrentProfile } from '@/lib/profile';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const { user, profile, profileComplete } = await getCurrentProfile();

  if (!profileComplete) {
    redirect('/onboarding');
  }

  return (
    <AppPageShell
        eyebrow="Settings"
        title="Workspace settings"
        description="A simple profile summary and account view for the first version of CareerOS."
        action={
          <Link href="/onboarding" className={buttonClassName({ variant: 'secondary' })}>
            Edit profile
          </Link>
        }
        contentClassName="space-y-8"
      >

      <div className="grid gap-4 lg:grid-cols-2">
        <AppShellCard
          title="Account"
          description="Basic account details from Supabase auth."
        >
          <dl className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Email</dt>
              <dd className="text-right text-slate-200">{user?.email ?? 'Not available'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Auth provider</dt>
              <dd className="text-right text-slate-200">Email + password</dd>
            </div>
          </dl>
        </AppShellCard>

        <AppShellCard
          title="Saved profile"
          description="Your stored onboarding preferences in Supabase."
        >
          <dl className="space-y-4 text-sm">
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Full name</dt>
              <dd className="text-right text-slate-200">{profile?.full_name ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Target role</dt>
              <dd className="text-right text-slate-200">{profile?.target_role ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Salary range</dt>
              <dd className="text-right text-slate-200">
                {profile?.salary_min || profile?.salary_max
                  ? `$${profile?.salary_min?.toLocaleString() ?? '0'} - $${profile?.salary_max?.toLocaleString() ?? '0'}`
                  : 'Not set'}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Remote preference</dt>
              <dd className="text-right text-slate-200">{profile?.remote_preference ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Preferred locations</dt>
              <dd className="max-w-[18rem] text-right text-slate-200">{profile?.preferred_locations ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Must-have keywords</dt>
              <dd className="max-w-[18rem] text-right text-slate-200">{profile?.must_have_keywords ?? 'Not set'}</dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="text-slate-500">Avoid keywords</dt>
              <dd className="max-w-[18rem] text-right text-slate-200">{profile?.avoid_keywords ?? 'Not set'}</dd>
            </div>
          </dl>
        </AppShellCard>
      </div>
    </AppPageShell>
  );
}
