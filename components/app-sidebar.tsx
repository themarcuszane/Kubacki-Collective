'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BriefcaseBusiness, LogOut, Settings2, Workflow } from 'lucide-react';
import { signOut } from '@/app/actions/auth';
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
    <aside className="flex h-full w-full max-w-xs flex-col rounded-3xl border border-slate-800 bg-slate-950/80 p-5 backdrop-blur">
      <div className="space-y-1 border-b border-slate-800 pb-5">
        <Link href="/dashboard" className="border-none text-lg font-semibold tracking-tight text-white">
          CareerOS
        </Link>
        <p className="text-sm text-slate-400">Keep your search moving with one calm workspace.</p>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-300',
                active ? 'bg-sky-400/10 text-sky-100' : 'hover:bg-slate-900 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <form action={signOut} className="pt-5">
        <Button type="submit" variant="outline" className="w-full justify-center">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </form>
    </aside>
  );
}
