import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentType = "chapters" | "journal";

export type FrontmatterBase = {
  title: string;
  description?: string;
  date?: string;
  tag?: string;
  draft?: boolean;
  image?: string; // /images/... path
};

export type ContentItem<TFrontmatter extends FrontmatterBase = FrontmatterBase> = {
  slug: string;
  frontmatter: TFrontmatter;
  content: string;
};

function contentDir(type: ContentType) {
  return path.join(process.cwd(), "content", type);
}

function readFileSafe(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

export function getAllSlugs(type: ContentType) {
  const dir = contentDir(type);
  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getContentBySlug<TFrontmatter extends FrontmatterBase = FrontmatterBase>(
  type: ContentType,
  slug: string
): ContentItem<TFrontmatter> {
  const dir = contentDir(type);
  const filePathMdx = path.join(dir, `${slug}.mdx`);
  const filePathMd = path.join(dir, `${slug}.md`);

  const filePath = fs.existsSync(filePathMdx) ? filePathMdx : filePathMd;

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content not found: ${type}/${slug}`);
  }

  const raw = readFileSafe(filePath);
  const parsed = matter(raw);

  return {
    slug,
    frontmatter: (parsed.data || {}) as TFrontmatter,
    content: parsed.content,
  };
}

export function getAllContent<TFrontmatter extends FrontmatterBase = FrontmatterBase>(
  type: ContentType
): Array<ContentItem<TFrontmatter>> {
  const slugs = getAllSlugs(type);

  const items = slugs.map((slug) => getContentBySlug<TFrontmatter>(type, slug));

  // filter drafts by default
  const nonDraft = items.filter((i) => !i.frontmatter.draft);

  // sort: newest first if date exists
  nonDraft.sort((a, b) => {
    const ad = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const bd = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return bd - ad;
  });

  return nonDraft;
}
