// app/collective/page.tsx
import Link from "next/link";

const container = "mx-auto w-full max-w-6xl px-6 md:px-8";

import RotatingCollectiveBackdrop from "../../components/collective/RotatingCollectiveBackdrop";

export default function CollectivePage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <RotatingCollectiveBackdrop opacity={0.18} intervalMs={5200} blurPx={0} />
      <div className={`${container} relative z-10 pt-14 md:pt-20 pb-20`}>
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">Collective</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Taste, systems, and quiet execution.
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-white/70">
          Kubacki Collective is a small studio building modern web experiences — cinematic presentation,
          accessible systems, and the kind of polish you feel immediately.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <section className="md:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white">What we build</h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
              Brand-forward marketing sites. Publishing systems. Design systems. Product UI. And the connective tissue
              that makes it all consistent.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Cinematic front-ends</p>
                <p className="mt-2 text-sm text-white/75">Hero choreography, image treatment, narrative hierarchy.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Systems that scale</p>
                <p className="mt-2 text-sm text-white/75">Tokens, components, rules — documented and durable.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Publishing with MDX</p>
                <p className="mt-2 text-sm text-white/75">Fast authoring with the same standards as UI.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Accessibility-first</p>
                <p className="mt-2 text-sm text-white/75">Semantics, contrast, focus states, reduced motion.</p>
              </div>
            </div>
          </section>

          <aside className="md:col-span-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white">The manifesto</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Clarity beats clever. Speed is a feature. Accessibility is craft. Motion is punctuation.
              Ship, learn, refine.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-white/55">Start here</p>
              <div className="mt-3 flex flex-col gap-2">
                {/*
                <Link
                  href="/chapters"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 hover:bg-white/[0.05] transition"
                >
                  Explore Chapters <span aria-hidden>→</span>
                </Link>
                */}
                {/*
                <Link
                  href="/journal"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 hover:bg-white/[0.05] transition"
                >
                  Read the Journal <span aria-hidden>→</span>
                </Link>
                */}
              </div>
            </div>

            <p className="mt-6 text-xs text-white/50">
              This site is actively being built — the Journal is the changelog.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
