# Testing Kubacki Collective

Use Node.js 24 and the committed npm lockfile. CI pins Ubuntu 24.04 because the locked Playwright 1.58 browser builds do not support Ubuntu 26.04. CI uses pinned GitHub Actions. In addition to tests, CI runs separate full and production npm audits, scans all Git history and the exported public files with checksum-verified Gitleaks, and analyzes JavaScript/TypeScript with CodeQL `security-extended` queries. It packages the tested public export, manifest, and checksums. Only a successful push to `main` receives a GitHub artifact provenance attestation; pull requests have no OIDC or attestation write permissions. See the [release runbook](operations/release.md) for verification.

## Public collective site

```sh
npm ci
npx playwright install --with-deps chromium webkit
npm test
npm run build:public
npm run test:e2e
```

The public release build writes `out/` plus `out.manifest.json`; E2E should exercise that exported artifact through the Node static preview (`npm run preview:public`). This matches the production delivery shape on S3/CloudFront. For a quick local check, `npm run preview:public` binds to `127.0.0.1:3197` by default; `PORT` can override it.

Coverage includes collective and company branding, the public pages with and without trailing slashes, chapter/journal navigation and rendered MDX, real 404 responses, carousel display and rotation, and image integrity. Matcher regression tests cover the separate CareerOS scaffold behavior. No Supabase project, API key, database, or production credential is needed for public tests.

`npm run build:public` uses an explicit source allowlist. It records source commit and dirty state, rejects forbidden scaffold output and the removed inventor image reference, checks required branding, and hashes every exported file. A build from dirty source is useful for development but not a release candidate; require `source_dirty: false` for release.

## Separate CareerOS scaffold

The original auth/anonymous-redirect tests remain under `tests/e2e/careeros.spec.ts`. They use the separate `playwright.careeros.config.ts` and require `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for a dedicated test project:

```sh
npm run test:e2e:careeros
```

Do not use production credentials for these checks. They do not validate the public static export, authenticated user flows, or live database isolation. CareerOS routes and runtime files are intentionally not included in `build:public`.

## Live production smoke check

After a release is live, run `npm run test:e2e:release` to exercise the same public browser suite against `https://kubackicollective.com`. This config does not start a local server; the checks only load pages and assets and click carousel/navigation controls. It does not change production data or AWS settings. Output is written under ignored `test-results/live/`. Review failures against the deployed commit and current production state before treating them as a code regression.
