// components/home/section-progress-nav.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const sections = [
  { id: "manifesto", label: "Manifesto" },
  { id: "principles", label: "Principles" },
  { id: "atmosphere", label: "Atmosphere" },
  { id: "chapters", label: "Chapters" },
  { id: "journal", label: "Journal" },
  { id: "signal", label: "Signal" },
];

export function SectionProgressNav() {
  const [active, setActive] = useState<string>("manifesto");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(section.id);
          }
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div className="sticky top-16 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-6 py-3 md:px-8">
        <span className="text-[11px] uppercase tracking-[0.24em] text-white/40 whitespace-nowrap">
          Now reading
        </span>

        <div className="flex items-center gap-2">
          {sections.map((section) => {
            const isActive = active === section.id;

            return (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] tracking-[0.18em] transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
