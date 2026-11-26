"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const IMAGES: string[] = [
  "/images/collective/mountain-view.jpg",
  "/images/collective/paris-street-02.jpg",
  "/images/collective/Paris1.jpeg",
  // If/when these exist in public/images/collective, uncomment:
  // "/images/collective/nyc-walk-01.jpg",
  // "/images/collective/nyc-walk-02.jpg",
  // "/images/collective/umbrella-portrait.jpg",
];

export default function StartPage() {
  return (
    <main id="main-content" tabIndex={-1} className="relative min-h-screen w-full overflow-hidden bg-[#12100f] text-[#f2eee6]">
      <BackgroundRotator images={IMAGES} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <h1 className="display-serif max-w-4xl text-center text-4xl leading-tight md:text-7xl">
          Kubacki Spring Clothing Collective Coming Soon
        </h1>
      </div>
    </main>
  );
}

function BackgroundRotator({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setCanRotate(!preference.matches);
    updateMotionPreference();
    preference.addEventListener("change", updateMotionPreference);
    return () => preference.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!canRotate || images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [canRotate, images]);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((src, i) => (
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

      {/* readability overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
