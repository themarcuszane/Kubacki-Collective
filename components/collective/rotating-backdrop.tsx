"use client";

import Image from "next/image";
import * as React from "react";

type RotatingBackdropProps = {
  images: string[];
  intervalMs?: number;
  fadeMs?: number;
  overlayClassName?: string;
};

export function RotatingBackdrop({
  images,
  intervalMs = 6500,
  fadeMs = 1200,
  overlayClassName = "bg-black/45",
}: RotatingBackdropProps) {
  const srcs = React.useMemo(() => {
    const list = (images || []).filter(Boolean);
    return Array.from(new Set(list));
  }, [images]);

  const [idx, setIdx] = React.useState(0);
  const [prevIdx, setPrevIdx] = React.useState<number | null>(null);
  const [isFading, setIsFading] = React.useState(false);

  const intervalRef = React.useRef<number | null>(null);
  const fadeRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (srcs.length <= 1) return;

    const tick = () => {
      setPrevIdx(idx);
      setIsFading(true);

      if (fadeRef.current) window.clearTimeout(fadeRef.current);
      fadeRef.current = window.setTimeout(() => {
        setIdx((cur) => (cur + 1) % srcs.length);
        setIsFading(false);
        setPrevIdx(null);
      }, fadeMs) as unknown as number;
    };

    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, intervalMs) as unknown as number;

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (fadeRef.current) window.clearTimeout(fadeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srcs.length, intervalMs, fadeMs, idx]);

  if (!srcs.length) return null;

  const currentSrc = srcs[idx];
  const previousSrc = prevIdx !== null ? srcs[prevIdx] : null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Current */}
      <div className="absolute inset-0">
        <Image
          src={currentSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Previous fades out */}
      {previousSrc && (
        <div
          className={`absolute inset-0 transition-opacity ${isFading ? "opacity-0" : "opacity-100"}`}
          style={{ transitionDuration: `${fadeMs}ms` }}
        >
          <Image src={previousSrc} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
      )}

      {/* Readability overlay */}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
