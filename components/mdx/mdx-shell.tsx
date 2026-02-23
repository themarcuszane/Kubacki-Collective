import * as React from "react";

const container = "mx-auto w-full max-w-3xl px-6 md:px-8";

export function MDXShell(props: { title: string; description?: string; meta?: React.ReactNode; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className={container}>
        <div className="pt-14 md:pt-20 pb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-white/60">Kubacki Collective</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">{props.title}</h1>
          {props.description ? (
            <p className="mt-3 text-base md:text-lg leading-relaxed text-white/70">{props.description}</p>
          ) : null}
          {props.meta ? <div className="mt-5">{props.meta}</div> : null}
        </div>

        <article className="pb-20">{props.children}</article>
      </div>
    </main>
  );
}
