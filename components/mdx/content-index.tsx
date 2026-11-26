import Link from 'next/link';
import type { ContentItem } from '@/lib/content';

type Props = {
  section: 'chapters' | 'journal';
  title: string;
  description: string;
  items: ContentItem[];
};

export function ContentIndex({ section, title, description, items }: Props) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#12100f] text-[#f2eee6]">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10 lg:pt-16">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#c2a77a]">{section}</p>
        <div className="mt-5 grid gap-6 pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h1 className="display-serif max-w-2xl text-5xl leading-[1.05] md:text-6xl">{title}</h1>
          <p className="max-w-md text-base leading-7 text-white/65">{description}</p>
        </div>
        <ol className="border-t border-white/20">
          {items.map((item, index) => (
            <li key={item.slug} className="border-b border-white/15">
              <Link href={`/${section}/${item.slug}`} className="group grid gap-4 py-7 transition-colors hover:bg-white/[0.025] sm:grid-cols-[3rem_1fr_auto] sm:gap-6 sm:py-9">
                <span className="pt-1 text-[10px] tracking-[0.16em] text-[#c2a77a]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  {item.frontmatter.date ? <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-white/50">{item.frontmatter.date}</p> : null}
                  <h2 className="display-serif text-3xl leading-tight text-[#f2eee6] transition-colors group-hover:text-[#d7c19c] md:text-4xl">{item.frontmatter.title}</h2>
                  {item.frontmatter.description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">{item.frontmatter.description}</p> : null}
                </div>
                <span aria-hidden="true" className="pt-1 text-2xl text-white/55 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none">↗</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
