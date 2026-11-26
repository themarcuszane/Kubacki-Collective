# Derek portrait carousel update: tests and security scope

The user requested the finished Kubacki Collective shirt portrait in both public carousels. The portrait is first in each rotation; existing photographs remain. The full portrait uses `object-fit: contain` to retain the face and sleeve prints on narrow screens. The change adds one static PNG and changes carousel selection/presentation; it adds no dependencies, uploaded-file endpoint, external script, or authentication feature.

## Functional verification

- Production Next.js build passed.
- Unit tests: 26 passed, including the new image-integrity test.
- Chromium and WebKit: 26 browser checks passed, including loading the new portrait first and continuing rotation on both routes.
- TypeScript checking and lint on changed source/test files passed.
- Static export, desktop/mobile visual checks, and deployed-site verification are recorded in the production release when completed.

## Image and code checks

The image is an RGB8 PNG, 1193 × 1319 pixels. Its signature, chunk boundaries and CRCs, bounded decompression, scanline filter bytes, and end-of-image boundary pass validation. Its chunks are IHDR, IDAT, IEND, and C2PA provenance metadata in caBX, the embedding described by the [C2PA specification](https://spec.c2pa.org/specifications/specifications/2.5/specs/C2PA_Specification.html). No data follows IEND. This verifies a well-formed passive image; it is not a guarantee against every image-decoder vulnerability or a signature-based antivirus result. No local antivirus engine was available, and this check does not validate the C2PA signature chain.

The image is generated with built-in imagegen from the user-approved mockup and reference portraits. It is published as an image asset, not HTML/SVG/executable code. The deployment must verify its HTTP `Content-Type: image/png` and its content hash. Review of the code change confirms fixed same-origin image paths and no new script execution, HTML injection, or third-party network integration.

## Existing risks still open

The current `npm audit --omit=dev --json` reports nine affected package entries: one critical, six high, two moderate. These are the previously recorded dependency findings, not nine demonstrated live-site exploits. The locked dependencies were not changed by this portrait update. Production is a static S3/CloudFront export; the unrelated CareerOS server/auth routes must remain excluded. Server-only Next.js advisories do not establish a running vulnerable Next.js server on S3, while build/developer-tool risks and any applicable browser paths still require remediation.

The prior security review also records the public HTTP S3 website origin and missing browser security headers. They are not fixed by adding an image. Refer to [the complete review](2026-11-25-review.md) and [GitHub tracker #10](https://github.com/themarcuszane/Kubacki-Collective/issues/10) for acceptance criteria and remaining IAM/logging/DNS verification.

No test can establish that a website can never contain malware or be compromised. This report distinguishes checks of the new change from unresolved security work and does not certify the whole application or AWS account as fully secure.
