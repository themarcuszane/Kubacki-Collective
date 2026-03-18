import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/supabase/types';

export type Profile = Database['public']['Tables']['profiles']['Row'];

export function isProfileComplete(profile: Pick<Profile, 'full_name' | 'target_role'> | null | undefined) {
  return Boolean(profile?.full_name?.trim() && profile?.target_role?.trim());
}

export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).maybeSingle();
  const profile = data as Profile | null;

  return {
    supabase,
    user,
    profile,
    profileComplete: isProfileComplete(profile)
  };
}
