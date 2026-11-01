import Link from 'next/link';
import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Brand({ href = '/', className }: { href?: string; className?: string }) {
  return (
    <Link href={href} aria-label="CareerOS home" className={cn('inline-flex shrink-0 items-center gap-2.5 text-lg font-semibold tracking-tight text-white', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-300/20 bg-sky-300/10 text-sky-300"><Compass aria-hidden="true" className="h-[18px] w-[18px]" /></span>
      <span>Career<span className="text-slate-400">OS</span></span>
    </Link>
  );
}
