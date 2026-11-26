'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import Mark from '@/components/Mark';

const navigation = [
  { href: '/collective', label: 'Collective' },
  { href: '/chapters', label: 'Chapters' },
  { href: '/journal', label: 'Journal' }
];

export default function Header() {
  const pathname = usePathname().replace(/\/+$/, '') || '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#12100f]/95 backdrop-blur-md" onKeyDown={event => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-6 md:px-10">
        <Link href="/" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.1em] md:text-sm">
          <Mark size={24} title="Kubacki mark" />
          <span className="flex flex-col gap-1.5"><span>Kubacki Collective</span><span className="text-[9px] tracking-[0.14em] text-white/55">By TeamDryBox LLC</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navigation.map(item => {
            const current = pathname === item.href || pathname.startsWith(item.href + '/');
            return <Link key={item.href} href={item.href} aria-current={current ? 'page' : undefined} className={`inline-flex min-h-11 items-center text-xs tracking-wide transition-colors ${current ? 'text-[#d7c19c]' : 'text-white/65 hover:text-[#f2eee6]'}`}>{item.label}</Link>;
          })}
        </nav>
        <button ref={menuButton} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)} className="min-h-11 min-w-14 border border-white/20 px-3 text-xs text-[#f2eee6] md:hidden">{menuOpen ? 'Close' : 'Menu'}</button>
      </div>
      {menuOpen ? <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-white/10 px-6 py-3 md:hidden">
        {navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={pathname === item.href || pathname.startsWith(item.href + '/') ? 'page' : undefined} className="flex min-h-12 items-center justify-between border-b border-white/10 text-sm last:border-0">{item.label}<span aria-hidden="true">↗</span></Link>)}
      </nav> : null}
    </header>
  );
}
