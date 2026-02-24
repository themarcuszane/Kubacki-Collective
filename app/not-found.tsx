// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-3xl px-6 md:px-8 pt-20 pb-20">
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">404</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">Not found.</h1>
        <p className="mt-4 text-base leading-relaxed text-white/70">
          The page you’re looking for doesn’t exist — or it moved. Keep it clean. Keep it moving.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
          >
            Back home
          </Link>
          {/*
          <Link
            href="/chapters"
            className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
          >
            Chapters
          </Link>
          */}
          {/*
          <Link
            href="/journal"
            className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
          >
            Journal
          </Link>
          */}
        </div>
      </div>
    </main>
  );
}
