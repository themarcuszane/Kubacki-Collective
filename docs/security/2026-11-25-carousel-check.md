# Kubacki Collective public site: tests and security review

This review covers the static Kubacki Collective public-site refresh, including the approved Derek Kubacki shirt portrait and the carousel controls. The shirt portrait remains first in both homepage and Collective carousels; the other approved photographs remain available. The Collective page also received revised copy and responsive layout changes. The site retains the “By TeamDryBox LLC” company attribution. CareerOS remains a separate scaffold and is excluded from the public export.

## Functional verification

- The public static export passed with 225 files. Its manifest records file hashes, source commit, and dirty state.
- Unit tests: 26 passed, including the image-integrity test.
- End-to-end tests: 34 passed across Chromium and WebKit. Coverage includes both carousels, reduced motion, play/pause, navigation, route and MDX behavior, branding, 404s, and removal of the inventor image reference and URL.
- TypeScript checking, ESLint, the normal Next.js build, and the public static build passed. Manual desktop Safari review covered the homepage and Collective page; mobile browser checks covered navigation.
- The deploy helper dry-run matched all 17 recorded legacy `.html` redirect key/location pairs, planned 225 objects, and put `index.html` last. The helper rejects dirty or mismatched source state, duplicate or unsafe manifest keys, and file hash mismatches; it does not delete objects. No AWS calls or production deployment were made for this review.
- The production smoke-test configuration is documented but was not run against the live site. The CareerOS browser suite was not run because a dedicated test Supabase project was unavailable.

## Artifact and image checks

For reviewed commit `bab8b664ab02f6db204d50a203171abaed4d6795`, the public export contained 225 files with manifest byte counts and SHA-256 values matching every file; no extra output files were found. A gitleaks scan of 40 reachable commits found no secrets. The two matches in the public artifact were false positives from the chapter slug `chapter-01-signals`. Five similar matches occurred only in ephemeral `.next` build output, which is not part of the public export. No public credential was confirmed.

The PNG SHA-256 is `29a69c19d501caa245a4784b8563c74bdc2dbbb7f015eaab45cbc060f07eb1bb`; it matches the approved asset in commit `2f51a67`. The image is RGB8, 1193 × 1319 pixels. Its signature, chunk boundaries and CRCs, bounded decompression, scanline filter bytes, and end-of-image boundary passed validation. Its chunks are IHDR, IDAT, IEND, and C2PA provenance metadata in caBX. No data follows IEND. No local antivirus engine was available, and this check did not validate the C2PA signature chain.

The image is a passive PNG, not HTML, SVG, or executable code. Code review found fixed same-origin image paths and no new script execution, HTML injection, or third-party network integration. The local export manifest confirms the image bytes and MIME extension in the export; this review did not verify the deployed HTTP response.

## Findings that remain open

A fresh `npm audit --omit=dev --json` run reports nine affected production dependency entries: one critical, six high, and two moderate. All nine entries report an available fix. These are dependency findings, not nine demonstrated live-site exploits. The locked dependencies were not changed by this site update. The site is delivered as static S3/CloudFront files; server-only Next.js advisories do not establish a running vulnerable Next.js server on S3, while build/developer-tool risks and any applicable browser paths still require remediation.

The earlier infrastructure review recorded a public HTTP S3 website origin that can bypass CloudFront controls, missing browser security headers, and S3 bucket versioning disabled. This review did not recheck those settings or change AWS configuration. Refer to [the complete security review](2026-11-25-review.md) and [tracker #10](https://github.com/themarcuszane/Kubacki-Collective/issues/10) for the prior evidence and open IAM, logging, DNS, origin, and header work. The local backup copy is hash-matched to its source tree, but it is not an independently verified, complete copy of the current S3 bucket.

The export and manifest are ignored, mutable local build outputs. Their internal hash and clean-commit checks establish consistency, not trusted provenance by themselves. For a release, rebuild from a trusted clean committed revision and record the manifest digest with the release record. The dry-run and static checks in this review are not production deployment approval.

## Review outcome

**Conditional GO for merging the static public-site UX and release-tooling change, with the findings above tracked as open work.** This is not a full security clearance, AWS settings approval, or approval to deploy. No production settings were changed, and no AWS upload, deletion, or CloudFront invalidation was performed.

This review does not certify that the whole application or AWS account is free from malware or compromise.
