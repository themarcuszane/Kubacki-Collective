'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isProfileComplete } from '@/lib/profile';

async function getCredentials(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  return { email, password };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = await getCredentials(formData);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  }

  const userId = data.user?.id;

  if (!userId) {
    redirect('/sign-in?error=Unable to load your account.');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, target_role')
    .eq('user_id', userId)
    .maybeSingle();

  revalidatePath('/', 'layout');
  redirect(isProfileComplete(profile) ? '/dashboard' : '/onboarding');
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const { email, password } = await getCredentials(formData);
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    redirect(`/sign-up?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session) {
    redirect('/sign-in?message=Check your email to confirm your account.');
  }

  revalidatePath('/', 'layout');
  redirect('/onboarding');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
