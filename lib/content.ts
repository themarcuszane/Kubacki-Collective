import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const chaptersDir = path.join(process.cwd(), 'content', 'chapters');
const journalDir = path.join(process.cwd(), 'content', 'journal');

type Piece = {
  name: string;
  price: string;
  availability: string;
};

export type ChapterFrontmatter = {
  type: 'chapter';
  title: string;
  slug: string;
  chapterNumber: number;
  status: string;
  thesis: string;
  pieces: Piece[];
};

export type JournalFrontmatter = {
  type: 'journal';
  title: string;
  slug: string;
  date: string;
  categories: string[];
  thesis: string;
};

function readMdxFrontmatter<T>(dir: string): T[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(raw);
      return data as T;
    });
}

export function listChapters(): ChapterFrontmatter[] {
  const chapters = readMdxFrontmatter<ChapterFrontmatter>(chaptersDir);
  return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function getChapterBySlug(slug: string): ChapterFrontmatter | undefined {
  return listChapters().find((chapter) => chapter.slug === slug);
}

export function listJournal(): JournalFrontmatter[] {
  const journal = readMdxFrontmatter<JournalFrontmatter>(journalDir);
  return journal.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getJournalBySlug(slug: string): JournalFrontmatter | undefined {
  return listJournal().find((entry) => entry.slug === slug);
}
