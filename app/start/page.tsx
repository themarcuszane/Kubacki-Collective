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

export default function StartPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <BackgroundRotator images={IMAGES} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <h1 className="text-center text-3xl md:text-6xl tracking-wide">
          Kubacki Spring Clothing Collective Coming Soon
        </h1>
      </div>
    </main>
  );
}

function BackgroundRotator({ images }: { images: string[] }) {
  "use client";

  const { useEffect, useState } = require("react");

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    // Faster than homepage rotation
    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % images.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [images]);

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
