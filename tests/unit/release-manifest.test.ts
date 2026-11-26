import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { assertExpectedManifestDigest } from "../../scripts/release-manifest.mjs";

describe("release manifest approval digest", () => {
  const manifest = Buffer.from('{"source_commit":"trusted"}\n');
  const digest = createHash("sha256").update(manifest).digest("hex");

  it("accepts the reviewed manifest digest", () => {
    expect(assertExpectedManifestDigest(manifest, digest)).toBe(digest);
  });

  it("rejects missing, malformed, and mismatched approval digests", () => {
    expect(() => assertExpectedManifestDigest(manifest, undefined)).toThrow(/required/);
    expect(() => assertExpectedManifestDigest(manifest, "not-a-digest")).toThrow(/required/);
    expect(() => assertExpectedManifestDigest(manifest, "0".repeat(64))).toThrow(/does not match/);
  });
});
