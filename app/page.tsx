import * as React from "react";
import Link from "next/link";

// IMPORTANT: Keep your existing hero import(s) the same.
// Replace this with whatever your hero component is actually called.
import { HomeHero } from "@/components/home/hero";
import { SectionProgressNav } from "@/components/home/section-progress-nav";
import { ManifestoSection } from "@/components/home/sections";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SectionProgressNav />
      <HomeHero />
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <Link href="/collective" className="text-sm tracking-wide text-white/70 hover:text-white">
          Collective
        </Link>
      </div>
      <ManifestoSection />
    </main>
  );
}
