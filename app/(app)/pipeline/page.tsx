import { AppPageShell } from '@/components/app-page-shell';
import { AppShellCard } from '@/components/app-shell-card';
import { getCurrentProfile } from '@/lib/profile';
import { redirect } from 'next/navigation';

export default async function PipelinePage() {
  const { profileComplete } = await getCurrentProfile();

  if (!profileComplete) {
    redirect('/onboarding');
  }

  const columns = ['Inbox', 'Applied', 'Interviewing', 'Decision'];

  return (
    <AppPageShell
        eyebrow="Pipeline"
        title="Your search in motion"
        description="From the first interesting role to the final decision."
        contentClassName="space-y-8"
      >

      <AppShellCard
        title="Every step, in view"
        description="Pipeline tracking is coming next. Here’s how your search will take shape."
      >
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => (
            <div key={column} className="rounded-2xl border border-slate-800/80 bg-slate-950/55 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-200">{column}</p>
                <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs text-slate-500">0</span>
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 px-4 py-8 text-center text-sm text-slate-500">
                Coming next
              </div>
            </div>
          ))}
        </div>
      </AppShellCard>
    </AppPageShell>
  );
}
