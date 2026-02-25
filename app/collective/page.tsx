"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES: string[] = [
  "/images/collective/inventor.jpeg",
  "/images/collective/mountain-view.jpg",
  "/images/collective/paris-street-02.jpg",
  "/images/collective/Paris1.jpeg",
  // If/when these exist in public/images/collective, uncomment:
  // "/images/collective/nyc-walk-01.jpg",
  // "/images/collective/nyc-walk-02.jpg",
  // "/images/collective/umbrella-portrait.jpg",
];

export default function CollectivePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!IMAGES || IMAGES.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <h1 className="text-center text-3xl md:text-6xl tracking-wide">
          Kubacki Spring Clothing Collective Coming Soon
        </h1>
      </div>
    </main>
  );
}
