'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function asText(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim() || null;
}

function asNumber(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? '').trim();
  return value ? Number(value) : null;
}

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  const salaryMin = asNumber(formData, 'salaryMin');
  const salaryMax = asNumber(formData, 'salaryMax');

  if (salaryMin !== null && Number.isNaN(salaryMin)) {
    redirect('/onboarding?error=Salary minimum must be a number.');
  }

  if (salaryMax !== null && Number.isNaN(salaryMax)) {
    redirect('/onboarding?error=Salary maximum must be a number.');
  }

  if (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax) {
    redirect('/onboarding?error=Salary minimum cannot be greater than salary maximum.');
  }

  const { error } = await supabase.from('profiles').upsert(
    {
      user_id: user.id,
      full_name: asText(formData, 'fullName'),
      target_role: asText(formData, 'targetRole'),
      salary_min: salaryMin,
      salary_max: salaryMax,
      remote_preference: asText(formData, 'remotePreference'),
      preferred_locations: asText(formData, 'preferredLocations'),
      must_have_keywords: asText(formData, 'mustHaveKeywords'),
      avoid_keywords: asText(formData, 'avoidKeywords')
    },
    {
      onConflict: 'user_id'
    }
  );

  if (error) {
    redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/onboarding');
  revalidatePath('/dashboard');
  redirect('/dashboard');
}
