// @vitest-environment node
import { readFileSync } from "node:fs";
import { crc32, inflateSync } from "node:zlib";
import { expect, it } from "vitest";

it("publishes a bounded, valid PNG with only image data and provenance metadata", () => {
  const bytes = readFileSync("public/images/collective/derek-kubacki-shirt-poland.png");
  expect(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
  const allowed = new Set(["IHDR", "caBX", "IDAT", "IEND"]);
  const compressed: Buffer[] = [];
  let offset = 8;
  let width = 0;
  let height = 0;
  let ended = false;
  while (offset < bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const kind = bytes.toString("ascii", offset + 4, offset + 8);
    const end = offset + length + 12;
    expect(end).toBeLessThanOrEqual(bytes.length);
    expect(allowed.has(kind), `Unexpected chunk ${kind}`).toBe(true);
    expect(crc32(bytes.subarray(offset + 4, end - 4))).toBe(bytes.readUInt32BE(end - 4));
    const payload = bytes.subarray(offset + 8, end - 4);
    if (kind === "IHDR") {
      expect(offset).toBe(8);
      width = payload.readUInt32BE(0);
      height = payload.readUInt32BE(4);
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      expect(width).toBeLessThanOrEqual(4096);
      expect(height).toBeLessThanOrEqual(4096);
      expect([...payload.subarray(8)]).toEqual([8, 2, 0, 0, 0]); // RGB8, no interlacing
    } else if (kind === "caBX") {
      expect(length).toBeLessThan(100_000);
      expect(payload.includes(Buffer.from("c2pa"))).toBe(true);
    } else if (kind === "IDAT") {
      compressed.push(payload);
    } else if (kind === "IEND") {
      expect(length).toBe(0);
      ended = true;
      offset = end;
      break;
    }
    offset = end;
  }
  expect(ended).toBe(true);
  expect(offset).toBe(bytes.length); // Reject appended non-image payloads.
  const expectedSize = height * (width * 3 + 1);
  const pixels = inflateSync(Buffer.concat(compressed), { maxOutputLength: expectedSize });
  expect(pixels.length).toBe(expectedSize);
  for (let row = 0; row < height; row++) expect(pixels[row * (width * 3 + 1)]).toBeLessThanOrEqual(4);
});
