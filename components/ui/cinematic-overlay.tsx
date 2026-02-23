"use client";

import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CinematicOverlayProps = {
  className?: string;
  strength?: "subtle" | "medium" | "strong";
};

export function CinematicOverlay(props: CinematicOverlayProps) {
  const strength = props.strength ?? "subtle";

  const vignetteOpacity =
    strength === "subtle"
      ? "opacity-60"
      : strength === "medium"
      ? "opacity-75"
      : "opacity-90";

  const washOpacity =
    strength === "subtle"
      ? "opacity-40"
      : strength === "medium"
      ? "opacity-55"
      : "opacity-70";

  const grainOpacity =
    strength === "subtle"
      ? "opacity-[0.12]"
      : strength === "medium"
      ? "opacity-[0.18]"
      : "opacity-[0.26]";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", props.className)}
      aria-hidden="true"
    >
      {/* Tonal wash */}
      <div
        className={cn(
          "absolute inset-0",
          washOpacity,
          "bg-gradient-to-b from-black/10 via-black/30 to-black/70"
        )}
      />

      {/* Vignette */}
      <div
        className={cn(
          "absolute inset-0",
          vignetteOpacity,
          "[background:radial-gradient(120%_80%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_35%,rgba(0,0,0,0.75)_100%)]"
        )}
      />

      {/* Grain */}
      <div
        className={cn(
          "absolute inset-0",
          grainOpacity,
          "[background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")]",
          "mix-blend-overlay"
        )}
      />
    </div>
  );
}
