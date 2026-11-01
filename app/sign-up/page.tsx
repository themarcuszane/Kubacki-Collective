import { AuthForm } from '@/components/auth/auth-form';
import { AuthShell } from '@/components/auth/auth-shell';
import { signUp } from '@/app/actions/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

type SearchParams = Promise<{ error?: string; message?: string }>;

export default async function SignUpPage({ searchParams }: { searchParams: SearchParams }) {
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
      title="Create your CareerOS account"
      description="Start with a clean workspace for your job search, then complete onboarding to set your preferences."
    >
      <div className="space-y-4">
        {params.error ? <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-400/5 p-3 text-sm leading-6 text-rose-200">{params.error}</p> : null}
        {params.message ? <p role="status" className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm leading-6 text-emerald-200">{params.message}</p> : null}
        <AuthForm
          mode="sign-up"
          title="Get started"
          description="Create an account with email and password."
          action={signUp}
          submitLabel="Create Account"
          footerText="Already have an account?"
          footerHref="/sign-in"
          footerLinkLabel="Sign in"
        />
      </div>
    </AuthShell>
  );
}
