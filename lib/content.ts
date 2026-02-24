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

function normalizeFrontmatter<TFrontmatter extends FrontmatterBase>(
  data: Record<string, unknown>
): TFrontmatter {
  const normalized: Record<string, unknown> = { ...data };
  if (normalized.date instanceof Date) {
    normalized.date = normalized.date.toISOString().slice(0, 10);
  }
  return normalized as TFrontmatter;
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
    frontmatter: normalizeFrontmatter<TFrontmatter>((parsed.data || {}) as Record<string, unknown>),
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

export function getLatestContent<TFrontmatter extends FrontmatterBase = FrontmatterBase>(
  type: ContentType,
  limit: number
): Array<ContentItem<TFrontmatter>> {
  const all = getAllContent<TFrontmatter>(type);
  return all.slice(0, Math.max(0, limit));
}

export function getFeaturedContent<TFrontmatter extends FrontmatterBase = FrontmatterBase>(
  type: ContentType,
  limit: number
): Array<ContentItem<TFrontmatter>> {
  const all = getAllContent<TFrontmatter>(type);

  // "featured" is optional; treat missing as false.
  const featured = all.filter((i: any) => Boolean((i.frontmatter as any)?.featured));

  if (featured.length > 0) {
    return featured.slice(0, Math.max(0, limit));
  }

  return all.slice(0, Math.max(0, limit));
}

export function formatDateYYYYMMDDToLong(date?: string): string | undefined {
  if (!date) return undefined;
  // date expected "YYYY-MM-DD"
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) return date;

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);

  const d = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(d.getTime())) return date;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
