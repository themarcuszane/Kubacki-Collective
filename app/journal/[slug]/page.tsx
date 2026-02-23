import { notFound } from "next/navigation";
import { getAllSlugs, getContentBySlug, type FrontmatterBase } from "@/lib/content";
import { MDXShell } from "@/components/mdx/mdx-shell";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

export function generateStaticParams() {
  const slugs = getAllSlugs("journal");
  return slugs.map((slug) => ({ slug }));
}

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  let item: { slug: string; frontmatter: FrontmatterBase; content: string };

  try {
    item = getContentBySlug<FrontmatterBase>("journal", params.slug);
  } catch {
    notFound();
  }

  return (
    <MDXShell
      title={item.frontmatter.title}
      description={item.frontmatter.description}
      meta={
        <div className="flex flex-wrap items-center gap-2">
          {item.frontmatter.date ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              {item.frontmatter.date}
            </span>
          ) : null}
          {item.frontmatter.tag ? (
            <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
              {item.frontmatter.tag}
            </span>
          ) : null}
        </div>
      }
    >
      <MDXRemote source={item.content} components={mdxComponents as any} />
    </MDXShell>
  );
}
