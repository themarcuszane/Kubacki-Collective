import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareerOS',
  description: 'A personal workspace for a clearer job search. Define your next role and keep your preferences in focus.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_75%_15%,_rgba(56,189,248,0.055),_transparent_50%)]">
          {children}
        </div>
      </body>
    </html>
  );
}
