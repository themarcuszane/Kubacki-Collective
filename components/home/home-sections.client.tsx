// components/home/home-sections.client.tsx
"use client";

import * as React from "react";
import {
  ManifestoSection,
  PrinciplesSection,
  AtmosphereSection,
  ChaptersTeaserSection,
  JournalTeaserSection,
  SignalSignupSection,
} from "@/components/home/sections";

export type HomeTeaserItem = {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  tag?: string;
};

export function HomeBelowHeroSectionsClient(props: {
  latestChapters: HomeTeaserItem[];
  latestJournal: HomeTeaserItem[];
}) {
  return (
    <>
      <ManifestoSection />
      <PrinciplesSection />
      <AtmosphereSection />
      <ChaptersTeaserSection items={props.latestChapters} />
      <JournalTeaserSection items={props.latestJournal} />
      <SignalSignupSection />
    </>
  );
}
