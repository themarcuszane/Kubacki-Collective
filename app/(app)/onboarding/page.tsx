import { saveProfile } from '@/app/actions/profile';
import { AppPageShell } from '@/components/app-page-shell';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getCurrentProfile } from '@/lib/profile';

type SearchParams = Promise<{ error?: string }>;

export default async function OnboardingPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const { profile, profileComplete } = await getCurrentProfile();

  return (
    <AppPageShell
        eyebrow="Onboarding"
        title="Set up your profile"
        description={
          profileComplete
            ? 'Refine your preferences as your search evolves.'
            : 'Start with the essentials. What does your next role look like?'
        }
        className="mx-auto w-full max-w-4xl"
      >

      <Card className="border-slate-800/80 bg-slate-900/80">
        <CardHeader>
          <CardTitle>Your search preferences</CardTitle>
          <CardDescription>Full name and target role are required. Everything else can come later.</CardDescription>
        </CardHeader>
        <CardContent>
          {params.error ? <p role="alert" className="mb-5 text-sm text-rose-300">{params.error}</p> : null}
          <form action={saveProfile} className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile?.full_name ?? ''}
                  placeholder="Taylor Brooks"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target role</Label>
                <Input
                  id="targetRole"
                  name="targetRole"
                  defaultValue={profile?.target_role ?? ''}
                  placeholder="Senior Product Designer"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Salary min</Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  inputMode="numeric"
                  defaultValue={profile?.salary_min ?? ''}
                  placeholder="120000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMax">Salary max</Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  inputMode="numeric"
                  defaultValue={profile?.salary_max ?? ''}
                  placeholder="160000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remotePreference">Remote preference</Label>
              <Select id="remotePreference" name="remotePreference" defaultValue={profile?.remote_preference ?? 'remote-first'}>
                <option value="remote-first">Remote first</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
                <option value="flexible">Flexible</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredLocations">Preferred locations</Label>
              <Textarea
                id="preferredLocations"
                name="preferredLocations"
                defaultValue={profile?.preferred_locations ?? ''}
                placeholder="Boise, Denver, Remote in the US"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mustHaveKeywords">Must-have keywords</Label>
              <Textarea
                id="mustHaveKeywords"
                name="mustHaveKeywords"
                defaultValue={profile?.must_have_keywords ?? ''}
                placeholder="B2B SaaS, growth, user research"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avoidKeywords">Avoid keywords</Label>
              <Textarea
                id="avoidKeywords"
                name="avoidKeywords"
                defaultValue={profile?.avoid_keywords ?? ''}
                placeholder="Contract only, unpaid, commission-only"
              />
            </div>

            <div className="flex justify-end">
              <SubmitButton pendingLabel={profileComplete ? 'Updating…' : 'Saving…'}>Save profile</SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppPageShell>
  );
}
