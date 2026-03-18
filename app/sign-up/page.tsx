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
        {params.error ? <p className="text-sm text-rose-300">{params.error}</p> : null}
        {params.message ? <p className="text-sm text-emerald-300">{params.message}</p> : null}
        <AuthForm
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
