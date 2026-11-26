import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Refresh sessions only for the separate CareerOS scaffold. Public collective
  // pages and assets must work without Supabase configuration or network calls.
  matcher: [
    '/sign-in/:path*',
    '/sign-up/:path*',
    '/auth/:path*',
    '/dashboard/:path*',
    '/onboarding/:path*',
    '/opportunities/:path*',
    '/pipeline/:path*',
    '/settings/:path*'
  ]
};
