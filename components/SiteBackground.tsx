"use client";

import { usePathname } from "next/navigation";

export default function SiteBackground() {
  const pathname = usePathname() || "";
  const isCollective = pathname === "/collective" || pathname.startsWith("/collective/");

  if (isCollective) return null;

  // Home + the rest of the site keep the original background behavior.
  return <div className="absolute inset-0 bg-black" />;
}
