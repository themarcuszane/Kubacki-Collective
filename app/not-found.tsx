// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#12100f] text-[#f2eee6]">
      <div className="mx-auto w-full max-w-3xl px-6 pb-20 pt-20 md:px-8">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#c2a77a]">404</p>
        <h1 className="display-serif mt-4 text-5xl leading-tight md:text-6xl">Not found.</h1>
        <p className="mt-4 text-base leading-7 text-white/65">
          The page you’re looking for doesn’t exist — or it moved. Keep it clean. Keep it moving.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center border border-[#c2a77a] bg-[#c2a77a] px-6 text-[11px] uppercase tracking-[0.14em] text-[#12100f] hover:bg-[#dac59f]">
          Back home
        </Link>
      </div>
    </main>
  );
}
