"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES: string[] = [
  "/images/collective/inventor.jpeg",
  "/images/collective/mountain-view.jpg",
  "/images/collective/nyc-walk-01.jpg",
  "/images/collective/nyc-walk-02.jpg",
  "/images/collective/paris-street-02.jpg",
  "/images/collective/Paris1.jpeg",
  "/images/collective/umbrella-portrait.jpg",
];

export default function CollectivePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (IMAGES.length <= 1) return;

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
            className={`object-cover object-[50%_20%] transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-20 md:pt-24">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-3xl md:text-6xl tracking-wide">
            Kubacki Spring Clothing Collective Coming Soon
          </h1>

          <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-white/90">
            <p className="text-lg md:text-xl">
              Build with taste. Ship with intent.
              <br />
              Look sharp. Stay loyal. Keep going.
            </p>

            <p>
              Kubacki Collective is not chasing noise. It’s built on deliberate
              style, quiet execution, and the long, unfinished ritual of getting
              things exactly right.
            </p>

            <p>
              He can, on occasion, twirl a Butterfinger clean into his mouth
              from across the room-an oddly specific talent he treats with
              appropriate seriousness. And when the lights go low, he has a
              habit of disappearing into his own strange rituals, searching the
              floor for whatever tiny, glittering thing he’s convinced is worth
              finding.
            </p>

            <p>
              You’ll find him bounding from barstool to toolbox, moving with the
              confidence of someone who knows style matters-even when no one’s
              watching. And then there’s the garage. Seventeen years deep into a
              sacred ritual of sorting, sweeping, reorganizing, and declaring
              victory. The garage remains undefeated. He remains committed.
            </p>

            <p>Legend isn’t built in a day. Apparently, neither is storage.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
