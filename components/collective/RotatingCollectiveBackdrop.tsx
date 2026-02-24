"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  opacity?: number;        // 0..1
  intervalMs?: number;     // rotation speed
  blurPx?: number;         // subtle blur
};

export default function RotatingCollectiveBackdrop({
  opacity = 0.22,
  intervalMs = 5500,
  blurPx = 0,
}: Props) {
  const reduceMotion = useReducedMotion();

  const images = useMemo(
    () => [
      "/images/collective/home-atmosphere.jpg",
      "/images/collective/home-chapters.jpg",
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    const t = window.setInterval(() => {
      setIdx((v) => (v + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(t);
  }, [images.length, intervalMs, reduceMotion]);

  const src = images[idx];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/25" />
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={reduceMotion ? { opacity } : { opacity: 0 }}
          animate={{ opacity }}
          exit={reduceMotion ? { opacity } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
          style={blurPx > 0 ? { filter: `blur(${blurPx}px)` } : undefined}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" />
    </div>
  );
}
