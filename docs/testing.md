# Testing Kubacki Collective

Use Node 24 and the committed npm lockfile. The GitHub job pins Ubuntu 24.04 because the locked Playwright 1.58 browser builds do not support Ubuntu 26.04. It runs with read-only repository permissions and maintained GitHub Actions pinned to commit SHAs.

## Public collective site

```sh
npm ci
npx playwright install --with-deps chromium webkit
npm run test:all
```

`test:all` runs unit tests, builds the application, then runs Chromium/WebKit smoke tests against `next start`. Alternatively, run `npm test`, `npm run build`, and `npm run test:e2e` individually. `npm run test:e2e:ui` also requires a completed build. No Supabase project, API key, database, or production credential is required for the public suite.

Coverage includes the collective/company branding, public pages with and without trailing slashes, chapter/journal links and rendered MDX, and genuine 404 responses. Matcher regression tests prove that session handling excludes public routes/assets and still includes CareerOS routes. The protected layout and actions continue validating users.

The production-build smoke tests exercise the repository's public pages. This CI change does not create an S3 export/upload pipeline or deploy the application; the release-boundary work in security finding SEC-06 remains open.

## Separate CareerOS scaffold

The original auth/anonymous-redirect tests remain in `tests/e2e/careeros.spec.ts`. To run them, export `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for a dedicated test project, then:

```sh
npm run build
npm run test:e2e:careeros
```

The explicit CareerOS configuration exits with a clear error if either variable is absent. These tests are not included in public-site CI and do not validate authenticated flows or live database isolation. Never use production credentials merely to make public-site tests pass.

Session refresh is scoped to `/sign-in`, `/sign-up`, `/auth`, `/dashboard`, `/onboarding`, `/opportunities`, `/pipeline`, and `/settings`, including nested paths. Add the correct matcher and regression coverage if new authenticated routes are introduced. Public requests no longer initialize or contact Supabase.
