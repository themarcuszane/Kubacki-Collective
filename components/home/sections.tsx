"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CinematicOverlay } from "@/components/ui/cinematic-overlay";

type HomeTeaserItem = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tag?: string;
};

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const container = "mx-auto w-full max-w-6xl px-6 md:px-8";
const softBorder = "border border-white/10";
const subtleText = "text-white/70";
const headingText = "text-white";

function useMotion() {
  const prefersReduced = useReducedMotion();
  return React.useMemo(() => {
    const base = {
      initial: { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.7, ease: [0.21, 0.61, 0.35, 1] as any },
    };

    if (prefersReduced) {
      return {
        ...base,
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      };
    }

    return base;
  }, [prefersReduced]);
}

function SectionShell(props: SectionProps) {
  const m = useMotion();
  return (
    <section id={props.id} className={cn("relative py-12 md:py-14", props.className)}>
      <div className={container}>
        <motion.div {...m}>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-10 bg-white/20" />
              <p className="text-xs uppercase tracking-[0.24em] text-white/60">{props.eyebrow}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <h2 className={cn("text-2xl md:text-4xl font-semibold leading-tight", headingText)}>
                  {props.title}
                </h2>
                {props.subtitle ? (
                  <p className={cn("mt-3 text-sm md:text-base leading-relaxed", subtleText)}>
                    {props.subtitle}
                  </p>
                ) : null}
              </div>

              <div className="md:col-span-7">{props.children}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pill(props: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs tracking-wide text-white/75">
      {props.children}
    </span>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-8 w-full max-w-6xl px-6 md:my-10 md:px-8">
      <div className="h-px w-full bg-white/10" />
    </div>
  );
}

/**
 * Manifesto
 */
export function ManifestoSection() {
  const [expanded, setExpanded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const isExpanded = mounted ? expanded : false;

  return (
    <>
      <SectionShell
        id="manifesto"
        eyebrow="Manifesto"
        title="Build with taste. Ship with intent."
        subtitle="Kubacki Collective is a small studio for modern web craft — cinematic presentation, accessible systems, and quiet excellence."
        className="pt-10 md:pt-14"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div className={cn("rounded-2xl p-6 md:p-7", softBorder, "bg-white/[0.03]")}>
            <p className="text-sm md:text-base leading-relaxed text-white/80">
              We build for feel: rhythm, spacing, tone, and speed. Every detail supports a clear signal.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>Cinematic UI</Pill>
              <Pill>WCAG-first</Pill>
              <Pill>Motion with restraint</Pill>
            </div>
          </div>

          {isExpanded ? (
            <div className={cn("rounded-2xl p-6 md:p-7", softBorder, "bg-white/[0.02]")}>
              <p className="text-sm md:text-base leading-relaxed text-white/80">
                Design and engineering move together here. Systems scale, and pages persuade.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Design systems</Pill>
                <Pill>Next.js + Tailwind</Pill>
                <Pill>MDX publishing</Pill>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs tracking-[0.18em] text-white/80 hover:bg-white/[0.08] transition"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      </SectionShell>
      <Divider />
    </>
  );
}

/**
 * Principles
 */
const principles: Array<{ title: string; body: string; index: string }> = [
  {
    index: "01",
    title: "Clarity beats clever.",
    body: "Say less, mean more.",
  },
  {
    index: "02",
    title: "Speed is a feature.",
    body: "Fast feels like respect.",
  },
  {
    index: "03",
    title: "Accessibility is craft.",
    body: "Inclusive systems are stronger systems.",
  },
  {
    index: "04",
    title: "Motion is punctuation.",
    body: "Use movement to guide attention.",
  },
  {
    index: "05",
    title: "Systemize taste.",
    body: "Document decisions, not just components.",
  },
  {
    index: "06",
    title: "Ship, learn, refine.",
    body: "Release, learn, and improve quickly.",
  },
];

export function PrinciplesSection() {
  const [expanded, setExpanded] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const m = useMotion();
  const isExpanded = mounted ? expanded : false;
  const visible = isExpanded ? principles : principles.slice(0, 3);
  return (
    <>
      <SectionShell
        id="principles"
        eyebrow="Principles"
        title="A few rules we refuse to break."
        subtitle="These are the guardrails. They keep the work sharp when the schedule gets loud."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((p) => (
            <motion.div
              key={p.index}
              initial={m.initial}
              whileInView={m.whileInView}
              viewport={m.viewport}
              transition={{ ...m.transition, delay: 0.04 }}
              className={cn("rounded-2xl p-6 md:p-7", softBorder, "bg-white/[0.02]")}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-white">{p.title}</h3>
                <span className="text-xs tracking-[0.24em] text-white/45">{p.index}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{p.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs tracking-[0.18em] text-white/80 hover:bg-white/[0.08] transition"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      </SectionShell>
      <Divider />
    </>
  );
}

/**
 * Atmosphere
 */
export function AtmosphereSection() {
  const m = useMotion();

  return (
    <>
      <section id="atmosphere" className="relative py-16 md:py-24">
        <div className={container}>
          <motion.div {...m} className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-10 bg-white/20" />
                  <p className="text-xs uppercase tracking-[0.24em] text-white/60">Atmosphere</p>
                </div>
                <h2 className="mt-4 text-2xl md:text-4xl font-semibold leading-tight text-white">
                  Texture, light, and quiet confidence.
                </h2>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
                  A Kubacki page should feel focused, warm, and precise.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">Tone</p>
                    <p className="mt-2 text-sm text-white/75">Cinematic, grounded, human.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">Materials</p>
                    <p className="mt-2 text-sm text-white/75">Soft gradients, grain, and depth.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">Motion</p>
                    <p className="mt-2 text-sm text-white/75">Slow in. Quick out. Never jittery.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/55">Type</p>
                    <p className="mt-2 text-sm text-white/75">Readable hierarchy. Air between lines.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 relative min-h-[220px] md:min-h-[360px] bg-black">
                <div className="absolute inset-0">
                  <Image
                    src="/images/collective/home-atmosphere.jpg"
                    alt="Cinematic architectural light and shadow representing the Kubacki Collective atmosphere."
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
                <CinematicOverlay strength="subtle" />
              </div>
            </div>
          </motion.div>

          <p className="mt-4 text-xs text-white/50">
            Note: Add your own image at <span className="text-white/70">/public/images/home-atmosphere.jpg</span>
          </p>
        </div>
      </section>
      <Divider />
    </>
  );
}

/**
 * Chapters teaser
 */
export function ChaptersTeaserSection(props: { items: HomeTeaserItem[] }) {
  const m = useMotion();
  const items = props.items ?? [];

  return (
    <>
      <SectionShell
        id="chapters"
        eyebrow="Chapters"
        title="Small collections. Big intention."
        subtitle="Curated threads that turn taste into proof."
      >
        <motion.div
          initial={m.initial}
          whileInView={m.whileInView}
          viewport={m.viewport}
          transition={m.transition}
          className={cn("rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden")}
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-6 p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-white">Featured chapters</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Chapters are curated threads — the systems behind the aesthetic.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3">
                {items.length ? (
                  items.map((i) => (
                    <Link
                      key={i.slug}
                      href={`/chapters/${i.slug}`}
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-white/85 group-hover:text-white transition">
                            {i.title}
                          </p>
                          {i.tag ? (
                            <div className="mt-2">
                              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.14em] text-white/60">
                                {i.tag}
                              </span>
                            </div>
                          ) : null}
                          {i.description ? (
                            <p className="mt-1 text-xs leading-relaxed text-white/60">{i.description}</p>
                          ) : null}
                        </div>
                        <span className="text-white/40 group-hover:text-white/70 transition" aria-hidden>
                          →
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-sm text-white/70">No chapters published yet.</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Link
                  href="/chapters"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
                >
                  Explore chapters
                </Link>
              </div>
            </div>

            <div className="md:col-span-6 relative min-h-[220px] md:min-h-[360px] bg-black">
              <Image
                src="/images/collective/home-chapters.jpg"
                alt="Modern architectural geometry representing structure and system."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
              <CinematicOverlay strength="subtle" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/55">Current focus</p>
                  <p className="mt-2 text-sm text-white/80">
                    Build a home for essays and artifacts without losing the cinematic edge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </SectionShell>
      <Divider />
    </>
  );
}

function ChapterCard(props: { title: string; desc: string; href: string }) {
  return (
    <Link
      href={props.href}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/85 group-hover:text-white transition">{props.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">{props.desc}</p>
        </div>
        <span className="text-white/40 group-hover:text-white/70 transition" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}

/**
 * Journal teaser
 */
export function JournalTeaserSection(props: { items: HomeTeaserItem[] }) {
  const m = useMotion();
  const items = props.items ?? [];

  return (
    <>
      <SectionShell
        id="journal"
        eyebrow="Journal"
        title="Notes from the build."
        subtitle="Short notes on craft, systems, and hard-earned lessons."
      >
        <motion.div
          initial={m.initial}
          whileInView={m.whileInView}
          viewport={m.viewport}
          transition={m.transition}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {items.length ? (
            items.map((i) => (
              <Link
                key={i.slug}
                href={`/journal/${i.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {i.date ? (
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.14em] text-white/60">
                      {i.date}
                    </span>
                  ) : null}
                  {i.tag ? (
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.14em] text-white/60">
                      {i.tag}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-3 text-base font-semibold text-white/85 group-hover:text-white transition">
                  {i.title}
                </h3>
                {i.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{i.description}</p>
                ) : null}
                <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition">
                  Read more <span aria-hidden>→</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:col-span-3">
              <p className="text-sm text-white/70">No journal posts published yet.</p>
            </div>
          )}
        </motion.div>

        <div className="mt-6">
          <Link
            href="/journal"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-sm text-white/85 hover:bg-white/[0.08] transition"
          >
            Read the journal
          </Link>
        </div>
      </SectionShell>
      <Divider />
    </>
  );
}

function PostCard(props: { title: string; date: string; excerpt: string; href: string }) {
  return (
    <Link
      href={props.href}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] transition"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-white/50">{props.date}</p>
      <h3 className="mt-3 text-base font-semibold text-white/85 group-hover:text-white transition">
        {props.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/65">{props.excerpt}</p>
      <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition">
        Read more <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

/**
 * Signal signup
 * (client-only, no external service wired yet)
 */
export function SignalSignupSection() {
  const m = useMotion();
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "ok">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: wire to Buttondown/Mailchimp/Resend later.
    // For now: optimistic confirmation.
    setStatus("ok");
    setEmail("");
  }

  return (
    <section id="signal" className="relative py-16 md:py-24">
      <div className={container}>
        <motion.div
          initial={m.initial}
          whileInView={m.whileInView}
          viewport={m.viewport}
          transition={m.transition}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-10 overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-10 bg-white/20" />
                <p className="text-xs uppercase tracking-[0.24em] text-white/60">Signal</p>
              </div>
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold leading-tight text-white">
                Get the good stuff. No spam. No noise.
              </h2>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-white/70">
                Occasional notes on systems, motion, and shipping polished web work.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>1–2 emails / month</Pill>
                <Pill>Unsubscribe anytime</Pill>
                <Pill>Zero fluff</Pill>
              </div>
            </div>

            <div className="md:col-span-6">
              <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-black/30 p-4 md:p-5">
                <label className="block text-xs uppercase tracking-[0.24em] text-white/55" htmlFor="email">
                  Email
                </label>

                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/85 placeholder:text-white/35 outline-none focus:border-white/25"
                    placeholder="marcus@kubackicollective.com"
                  />
                  <button
                    type="submit"
                    className="rounded-xl border border-white/15 bg-white/[0.08] px-5 py-3 text-sm text-white/85 hover:bg-white/[0.12] transition"
                  >
                    Join
                  </button>
                </div>

                {status === "ok" ? (
                  <p className="mt-3 text-sm text-white/75">
                    You’re in. We’ll keep it tight and useful.
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-white/50">
                    (We’ll wire this to a real list provider next — this is just UI.)
                  </p>
                )}
              </form>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Promise</p>
                <p className="mt-2 text-sm text-white/70">
                  If it isn’t helpful, we won’t send it. Signal only.
                </p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-[-120px] h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
            <div className="absolute -bottom-24 left-[-120px] h-72 w-72 rounded-full bg-white/[0.05] blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
