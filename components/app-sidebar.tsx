'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BriefcaseBusiness, LogOut, Settings2, Workflow } from 'lucide-react';
import { signOut } from '@/app/actions/auth';
import { Brand } from '@/components/brand';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/opportunities', label: 'Opportunities', icon: BriefcaseBusiness },
  { href: '/pipeline', label: 'Pipeline', icon: Workflow },
  { href: '/settings', label: 'Settings', icon: Settings2 }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-w-0 flex-col lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between gap-3 px-1 pb-5 lg:border-b lg:border-slate-800 lg:pb-7">
        <Brand href="/dashboard" />
        <form action={signOut} className="lg:hidden"><Button type="submit" variant="ghost" size="sm"><LogOut aria-hidden="true" className="h-4 w-4" /><span className="sr-only">Sign Out</span></Button></form>
      </div>
      <p className="eyebrow mb-3 mt-7 hidden px-3 lg:block">Workspace</p>
      <nav aria-label="Workspace" className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:flex lg:flex-col">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={cn(
              'flex min-w-0 items-center gap-2 rounded-lg border px-3 py-3 text-xs font-medium transition-colors sm:text-sm lg:gap-3',
              active ? 'border-sky-300/15 bg-sky-300/[0.08] text-sky-200' : 'border-transparent text-slate-400 hover:bg-slate-900 hover:text-white'
            )}>
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />{label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto hidden pt-10 lg:block">
        <p className="mb-5 px-3 text-xs leading-5 text-slate-500">One workspace.<br />Your next chapter.</p>
        <form action={signOut} className="border-t border-slate-800 pt-4"><Button type="submit" variant="ghost" className="w-full justify-start text-slate-400"><LogOut aria-hidden="true" className="h-4 w-4" />Sign Out</Button></form>
      </div>
    </aside>
  );
}
