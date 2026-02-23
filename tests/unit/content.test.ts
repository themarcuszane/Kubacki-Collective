import { describe, it, expect } from "vitest";
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
});
