import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { createClient } from '@/lib/supabase/server';

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1440px] p-4 sm:p-6 lg:p-8">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="grid gap-5 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[224px_minmax(0,1fr)] lg:gap-8">
        <AppSidebar />
        <main id="main-content" tabIndex={-1} className="min-w-0 rounded-2xl border border-slate-800/80 bg-slate-900/20 p-5 sm:p-7 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
