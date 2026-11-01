'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function PublicSiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname().replace(/\/+$/, '') || '/';
  const isPublicSite = pathname === '/' || pathname === '/collective' || pathname === '/start' || pathname === '/chapters' || pathname.startsWith('/chapters/') || pathname === '/journal' || pathname.startsWith('/journal/');

  if (!isPublicSite) return children;

  return <div className="min-h-screen bg-[#12100f] text-[#f2eee6]"><Header />{children}<Footer /></div>;
}
