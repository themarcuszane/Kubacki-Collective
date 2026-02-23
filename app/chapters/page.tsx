import Link from "next/link";
import { getAllContent, type FrontmatterBase } from "@/lib/content";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function ChaptersIndexPage() {
  const items = getAllContent<FrontmatterBase>("chapters");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8 pt-14 md:pt-20 pb-20">
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">Chapters</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Collections of work, patterns, and proof.
        </h1>
        <p className="mt-3 text-base md:text-lg leading-relaxed text-white/70">
          Chapters are curated threads — the systems behind the aesthetic.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/chapters/${item.slug}`}
              className={cn(
                "group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
              )}
            >
              <h2 className="text-lg font-semibold text-white/85 group-hover:text-white transition">
                {item.frontmatter.title}
              </h2>
              {item.frontmatter.description ? (
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.frontmatter.description}</p>
              ) : null}
              <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition">
                Open chapter <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
