import type { Metadata } from 'next';
import { PublicSiteShell } from '@/components/public-site-shell';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kubacki Collective | TeamDryBox LLC',
  description: 'Kubacki Collective — a lifestyle creative movement by TeamDryBox LLC. Build with taste. Ship with intent.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_75%_15%,_rgba(56,189,248,0.055),_transparent_50%)]">
          <PublicSiteShell>{children}</PublicSiteShell>
        </div>
      </body>
    </html>
  );
}
