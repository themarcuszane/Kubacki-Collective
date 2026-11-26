// @vitest-environment node
import { describe, expect, it } from "vitest";
// Next 16.1 names the matcher test helper after the former middleware convention.
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server";
import { config } from "@/proxy";

describe("CareerOS session boundary", () => {
  it.each([
    "/", "/collective", "/collective/", "/start", "/start/",
    "/chapters", "/chapters/cinematic", "/journal", "/journal/ship-first",
    "/images/hero/paris-coat.jpg", "/_next/static/chunk.js", "/unknown-page"
  ])("does not invoke session handling for public URL %s", (url) => {
    expect(unstable_doesMiddlewareMatch({ config, url })).toBe(false);
  });

  it.each([
    "/sign-in", "/sign-in/", "/sign-up", "/auth/callback",
    "/dashboard", "/onboarding", "/opportunities", "/pipeline", "/settings",
    "/dashboard/nested"
  ])("retains session handling for CareerOS URL %s", (url) => {
    expect(unstable_doesMiddlewareMatch({ config, url })).toBe(true);
  });
});
