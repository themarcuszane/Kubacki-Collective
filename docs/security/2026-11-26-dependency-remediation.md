# Dependency remediation — November 26, 2026

This change addresses SEC-03, [issue #3](https://github.com/themarcuszane/Kubacki-Collective/issues/3), on the public Kubacki Collective repository. The review tracker is [issue #10](https://github.com/themarcuszane/Kubacki-Collective/issues/10). The public site is served as static S3/CloudFront output; the separate CareerOS scaffold is not the public collective site.

## Audit results

| Audit | Before (review evidence) | After (fresh registry audit) |
| --- | ---: | ---: |
| Full dependency tree | 31 entries: 4 critical, 12 high, 13 moderate, 2 low | 0 vulnerabilities |
| Production dependencies | 9 entries: 1 critical, 6 high, 2 moderate | 0 vulnerabilities |

Before counts are from the November 25 review and issue #3, with full JSON in [`npm-audit.json`](evidence/2026-11-25/npm-audit.json) and production-only JSON in [`npm-audit-production.json`](evidence/2026-11-25/npm-audit-production.json). Fresh post-change registry results are preserved in [`npm-audit.json`](evidence/2026-11-26/npm-audit.json) and [`npm-audit-production.json`](evidence/2026-11-26/npm-audit-production.json). The counts refer to npm's affected package entries, including transitive and aggregate entries, rather than unique CVEs.

Commands run with Node.js 24.22.1 and the committed npm lockfile:

```sh
npm audit --json
npm audit --omit=dev --json
```

Both completed successfully with zero findings. The local sandbox initially could not resolve the npm registry; the live audits were run after network access was made available.

## Changes and rationale

- Updated `next`, `@next/mdx`, and `eslint-config-next` together from 16.1.6 / 16.2.0 to 16.4.5. The November advisory set includes Next.js vulnerabilities through 16.4.4; 16.4.5 is the minimum patched 16.x release verified by the live audit. Keeping these packages aligned avoids framework/plugin version drift. Next.js 16 is the Active LTS line per the [Next.js support policy](https://nextjs.org/support-policy); see the [maintainer security advisories](https://github.com/vercel/next.js/security/advisories).
- Updated `vitest` and `@vitest/ui` together from 3.2.4 to 4.1.12. Vitest 3.2.6 addresses the older UI issue, but the current advisory for `@vitest/mocker` covers Vitest versions below 4.1.11. Version 4.1.12 is the minimum queried release above that affected range and keeps the UI peer version aligned. Vitest's [release policy and supported versions](https://github.com/vitest-dev/vitest/blob/main/docs/releases.md) describe maintenance of the current and latest prior lines.
- Kept React and React DOM on their existing locked 19.2.4 versions and left `@supabase/ssr` and `@supabase/supabase-js` unchanged. Neither needed a direct update for this audit; Next.js 16.4.5 accepts React 19, and avoiding an unrelated Supabase minor-line change reduces compatibility risk.
- Ran ordinary `npm audit fix` without `--force` to resolve remaining transitive findings through compatible lockfile updates. No dependency override or forced major change was introduced.
- Committed the regenerated `package-lock.json` so installs and CI consume the audited tree.

## Verification

- `npm test`: 26 tests passed across 3 files.
- `tsc --noEmit --incremental false`: passed.
- `npm run lint`: passed.
- `npm run build:public`: passed and generated the static public export.
- `npm run test:e2e`: 34 public browser tests passed across Chromium and WebKit.
- The normal `next build` command's default Turbopack run could not bind its local compiler port in this sandbox, including on retry with elevated execution. `next build --webpack` completed successfully and generated the normal application build. This is recorded as an environment limitation of the default builder path; the webpack build and public export both passed.
- CareerOS's normal Next build routes compiled as part of the repository build. Its Playwright config loaded and listed all 4 scaffold tests using config-only placeholder values; no CareerOS auth test was run because a dedicated test Supabase project was not supplied. This is not evidence of live authentication behavior.
- `git diff --check`: passed.

No production deployment, AWS change, database query, or live CareerOS authentication check was performed. No known npm advisories remain in the final full or production-only audit. Issue #3 can be closed after this remediation is merged and CI evidence is attached; issue #10 remains open while the other review findings are active.
