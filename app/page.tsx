import * as React from "react";

// IMPORTANT: Keep your existing hero import(s) the same.
// Replace this with whatever your hero component is actually called.
import { HomeHero } from "@/components/home/hero";
import { SectionProgressNav } from "@/components/home/section-progress-nav";

import { HomeBelowHeroSections } from "@/components/home/home-sections.server";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HomeHero />
      <SectionProgressNav />
      <HomeBelowHeroSections />
    </main>
  );
}
