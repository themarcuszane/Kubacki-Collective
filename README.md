# Kubacki Collective

The public website for Kubacki Collective, branded “By TeamDryBox LLC.” Production is served at [kubackicollective.com](https://kubackicollective.com) through AWS CloudFront with an S3 static origin. This repository also includes an unrelated CareerOS scaffold; CareerOS is excluded from the public build and is not the public product.

## Local development

Requirements: Node.js 24 and npm. Install locked dependencies, then start the Next.js development server:

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. The public pages and local content do not require Supabase credentials. Do not add secrets to the repository or commit `.env` files.

## Build and preview the production public site

The release build isolates the public route and component allowlist, creates a static export, checks branding and excluded scaffold artifacts, and writes a per-file SHA-256 manifest:

```sh
npm run build:public
npm run preview:public
```

The preview binds only to `127.0.0.1:3197`; set `PORT` to choose a different port. Visit `http://127.0.0.1:3197`. The export is written to ignored `out/`, and its manifest to ignored `out.manifest.json`. A dirty working tree is recorded in the manifest; use a clean checkout of the intended commit for release. See [the release runbook](docs/operations/release.md) for artifact checks, deployment, verification, and rollback.

## Documentation

- [Public site architecture](ARCHITECTURE.md)
- [Testing guide](docs/testing.md)
- [Release and rollback runbook](docs/operations/release.md)
- [Security review and evidence](docs/security/2026-11-25-review.md)
- [Carousel change security report](docs/security/2026-11-25-carousel-check.md)
- [CareerOS scaffold architecture (legacy/separate)](docs/legacy/careeros-scaffold-architecture.md)

Production route scope: `/`, `/collective`, `/start`, `/chapters`, `/chapters/[slug]`, `/journal`, and `/journal/[slug]`. The static export contains no running application server, auth service, database, API, or CareerOS workspace.
