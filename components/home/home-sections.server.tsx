// components/home/home-sections.server.tsx
import * as React from "react";
import { getFeaturedContent, type FrontmatterBase } from "@/lib/content";
import { HomeBelowHeroSectionsClient } from "@/components/home/home-sections.client";

export type HomeTeaserItem = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tag?: string;
};

function mapItem(i: { slug: string; frontmatter: FrontmatterBase }): HomeTeaserItem {
  return {
    slug: i.slug,
    title: i.frontmatter.title,
    description: i.frontmatter.description,
    date: i.frontmatter.date,
    tag: i.frontmatter.tag,
  };
}

export function HomeBelowHeroSections() {
  const latestJournal = getFeaturedContent("journal", 3).map(mapItem);
  const latestChapters = getFeaturedContent("chapters", 3).map(mapItem);

  return (
    <HomeBelowHeroSectionsClient
      latestJournal={latestJournal}
      latestChapters={latestChapters}
    />
  );
}
