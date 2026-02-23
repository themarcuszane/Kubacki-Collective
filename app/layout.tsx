import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kubacki Collective',
  description: 'A lifestyle creative movement.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="u-grain" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(4rem, 8vw, 7rem)'
            }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
