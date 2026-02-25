import fs from "fs";
import path from "path";
import Image from "next/image";

/*
  SERVER SIDE: Read all files inside /public/collective
*/
function getCollectiveImages(): string[] {
  const imagesDirectory = path.join(process.cwd(), "public", "collective");

  const files = fs.readdirSync(imagesDirectory);

  const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  return files
    .filter((file) =>
      validExtensions.includes(path.extname(file).toLowerCase())
    )
    .map((file) => `/collective/${file}`);
}

export default function StartPage() {
  const images = getCollectiveImages();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <BackgroundRotator images={images} />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <h1 className="text-center text-3xl md:text-6xl tracking-wide">
          Kubacki Spring Clothing Collective Coming Soon
        </h1>
      </div>
    </main>
  );
}

/*
  CLIENT COMPONENT FOR ROTATION
*/
function BackgroundRotator({ images }: { images: string[] }) {
  "use client";

  const { useState, useEffect } = require("react");

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    // Faster rotation than homepage
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
