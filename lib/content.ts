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

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function publishedFiles(type: ContentType): Map<string, string> {
  if (type !== "chapters" && type !== "journal") throw new Error(`Unknown content type: ${String(type)}`);
  const dir = contentDir(type);
  const root = fs.realpathSync(dir);
  const files = new Map<string, string>();

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const match = /^(.*)\.(mdx|md)$/.exec(entry.name);
    if (!match || !SLUG_PATTERN.test(match[1]) || (!entry.isFile() && !entry.isSymbolicLink())) continue;
    const candidate = path.join(dir, entry.name);
    const resolved = fs.realpathSync(candidate);
    if (!resolved.startsWith(`${root}${path.sep}`)) continue;
    if (!fs.statSync(resolved).isFile()) continue;
    const parsed = matter(readFileSafe(resolved));
    if (parsed.data?.draft) continue;
    files.set(match[1], resolved);
  }
  return files;
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
  return [...publishedFiles(type).keys()].sort();
}

export function getContentBySlug<TFrontmatter extends FrontmatterBase = FrontmatterBase>(
  type: ContentType,
  slug: string
): ContentItem<TFrontmatter> {
  if (type !== "chapters" && type !== "journal") throw new Error(`Unknown content type: ${String(type)}`);
  if (typeof slug !== "string" || !SLUG_PATTERN.test(slug)) {
    throw new Error(`Invalid content slug: ${String(slug)}`);
  }
  const filePath = publishedFiles(type).get(slug);
  if (!filePath) {
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
