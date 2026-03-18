import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerOS',
  description: 'Your AI job search command center.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_38%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
