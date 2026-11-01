import { AuthForm } from '@/components/auth/auth-form';
import { AuthShell } from '@/components/auth/auth-shell';
import { signIn } from '@/app/actions/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

type SearchParams = Promise<{ error?: string; message?: string }>;

export default async function SignInPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <AuthShell
      title="Sign in to your workspace"
      description="Pick up where you left off and keep your opportunities, pipeline, and settings in one place."
    >
      <div className="space-y-4">
        {params.error ? <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/5 p-3 text-sm leading-6 text-rose-200">{params.error}</p> : null}
        {params.message ? <p role="status" className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm leading-6 text-emerald-200">{params.message}</p> : null}
        <AuthForm
          title="Welcome back"
          description="Use your email and password to access CareerOS."
          action={signIn}
          submitLabel="Sign In"
          footerText="Need an account?"
          footerHref="/sign-up"
          footerLinkLabel="Create one"
        />
      </div>
    </AuthShell>
  );
}
