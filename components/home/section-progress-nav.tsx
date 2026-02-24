"use client";

import * as React from "react";

type Item = { label: string; href: string };

const navItems: Item[] = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Collective", href: "/collective" },
];

export function SectionProgressNav() {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <div className="text-[10px] tracking-[0.22em] text-white/50">NOW READING</div>
        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/15 px-3 py-1 text-[12px] tracking-wide text-white/70 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
