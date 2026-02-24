// app/start/page.tsx
import Link from "next/link";

const container = "mx-auto w-full max-w-4xl px-6 md:px-8";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className={`${container} pt-16 md:pt-24 pb-20`}>
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">Start Here</p>

        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          A cinematic, accessible build log.
        </h1>

        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70">
          Kubacki Collective is where we document how we build: design systems, motion rules, publishing workflows,
          and the decisions that make a site feel expensive without being fragile.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">If you only click two things</p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/chapters/cinematic"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/80 hover:bg-white/[0.05] transition"
              >
                Chapter: Cinematic landing pages <span aria-hidden>→</span>
              </Link>

              <Link
                href="/journal/hero-rhythm"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/80 hover:bg-white/[0.05] transition"
              >
                Journal: Why the hero should feel slower than the scroll <span aria-hidden>→</span>
              </Link>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-white/65">
              This site is actively evolving. The Journal is the changelog. Chapters are curated proof.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">What we value</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Clarity beats clever.</li>
              <li>Speed is a feature.</li>
              <li>Accessibility is craft.</li>
              <li>Motion is punctuation.</li>
              <li>Ship, learn, refine.</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/collective"
                className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
              >
                Read about the Collective
              </Link>
              <Link
                href="/journal"
                className="rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
              >
                Browse the Journal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
