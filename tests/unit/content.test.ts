import { describe, it, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getAllSlugs, getAllContent, getContentBySlug } from "@/lib/content";

describe("content utilities", () => {
  it("returns chapter slugs", () => {
    const slugs = getAllSlugs("chapters");
    expect(Array.isArray(slugs)).toBe(true);
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("returns journal items sorted newest-first when dates exist", () => {
    const items = getAllContent("journal");
    expect(items.length).toBeGreaterThan(0);
  });

  it("loads a chapter by slug", () => {
    const item = getContentBySlug("chapters", "cinematic");
    expect(item.frontmatter.title).toBeTruthy();
    expect(item.content.length).toBeGreaterThan(10);
  });

  it("rejects unlisted and path-shaped slugs", () => {
    for (const slug of [
      "missing", "../outside", "nested/chapter", "nested\\chapter", "%2e%2e%2foutside",
      "%252e%252e%252foutside", "/etc/passwd", "chapter\0name",
    ]) {
      expect(() => getContentBySlug("chapters", slug)).toThrow();
    }
    expect(() => getContentBySlug("unknown" as "chapters", "cinematic")).toThrow(/Unknown content type/);
  });

  it("excludes drafts from direct loads, indexes, and static slug lists", () => {
    const originalCwd = process.cwd();
    const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "collective-content-"));
    try {
      fs.mkdirSync(path.join(fixture, "content", "chapters"), { recursive: true });
      fs.mkdirSync(path.join(fixture, "content", "journal"), { recursive: true });
      fs.writeFileSync(path.join(fixture, "content", "chapters", "public-note.mdx"), "---\ntitle: Public\n---\nPublic body");
      fs.writeFileSync(path.join(fixture, "content", "chapters", "draft-note.mdx"), "---\ntitle: Draft\ndraft: true\n---\nDraft body");
      fs.writeFileSync(path.join(fixture, "content", "chapters", "string-draft.mdx"), "---\ntitle: Draft\ndraft: 'true'\n---\nDraft body");
      process.chdir(fixture);

      expect(getAllSlugs("chapters")).toEqual(["public-note"]);
      expect(getAllContent("chapters").map((item) => item.slug)).toEqual(["public-note"]);
      expect(() => getContentBySlug("chapters", "draft-note")).toThrow();
      expect(() => getContentBySlug("chapters", "string-draft")).toThrow();
    } finally {
      process.chdir(originalCwd);
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  });

  it("does not publish or load a symlink that escapes the content directory", () => {
    const originalCwd = process.cwd();
    const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "collective-content-"));
    const outside = path.join(fixture, "outside.mdx");
    try {
      fs.mkdirSync(path.join(fixture, "content", "chapters"), { recursive: true });
      fs.mkdirSync(path.join(fixture, "content", "journal"), { recursive: true });
      fs.writeFileSync(outside, "---\ntitle: Private\n---\nPrivate body");
      fs.symlinkSync(outside, path.join(fixture, "content", "chapters", "linked-note.mdx"));
      process.chdir(fixture);

      expect(getAllSlugs("chapters")).toEqual([]);
      expect(() => getContentBySlug("chapters", "linked-note")).toThrow();
    } finally {
      process.chdir(originalCwd);
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  });

  it("rejects symlinked content roots and collection directories", () => {
    const originalCwd = process.cwd();
    const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "collective-content-"));
    try {
      fs.mkdirSync(path.join(fixture, "outside", "chapters"), { recursive: true });
      fs.mkdirSync(path.join(fixture, "outside", "journal"), { recursive: true });
      fs.writeFileSync(path.join(fixture, "outside", "chapters", "external-note.mdx"), "---\ntitle: External\n---\nExternal body");

      fs.symlinkSync(path.join(fixture, "outside"), path.join(fixture, "content"));
      process.chdir(fixture);
      expect(() => getAllSlugs("chapters")).toThrow(/real directory/);
      process.chdir(originalCwd);
      fs.rmSync(path.join(fixture, "content"));

      fs.mkdirSync(path.join(fixture, "content"), { recursive: true });
      fs.symlinkSync(path.join(fixture, "outside", "chapters"), path.join(fixture, "content", "chapters"));
      fs.mkdirSync(path.join(fixture, "content", "journal"));
      process.chdir(fixture);
      expect(() => getAllSlugs("chapters")).toThrow(/real directory/);
    } finally {
      process.chdir(originalCwd);
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  });
});
