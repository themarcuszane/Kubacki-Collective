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
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-7 sm:py-7 lg:px-10">
      <div className="grid flex-1 gap-5 lg:grid-cols-[272px_minmax(0,1fr)]">
        <AppSidebar />
        <div className="min-w-0 rounded-[28px] border border-slate-800/80 bg-slate-950/45 p-5 backdrop-blur-sm sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
