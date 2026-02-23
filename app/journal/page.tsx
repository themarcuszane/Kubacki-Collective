import Link from "next/link";
import { getAllContent, type FrontmatterBase } from "@/lib/content";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function JournalIndexPage() {
  const items = getAllContent<FrontmatterBase>("journal");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8 pt-14 md:pt-20 pb-20">
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">Journal</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
          Notes from the build.
        </h1>
        <p className="mt-3 text-base md:text-lg leading-relaxed text-white/70">
          Short posts on craft, systems, and what we learned the hard way.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/journal/${item.slug}`}
              className={cn(
                "group rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white/85 group-hover:text-white transition">
                  {item.frontmatter.title}
                </h2>
                {item.frontmatter.date ? (
                  <span className="text-xs text-white/45">{item.frontmatter.date}</span>
                ) : null}
              </div>
              {item.frontmatter.description ? (
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.frontmatter.description}</p>
              ) : null}
              <div className="mt-4 text-sm text-white/60 group-hover:text-white/80 transition">
                Read <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
