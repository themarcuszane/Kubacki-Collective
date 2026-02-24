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
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-black" />
          <div
            className="absolute inset-0 opacity-[0.06] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/collective/texture.jpg')" }}
          />
        </div>
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
