# Public site release and rollback

Production for [kubackicollective.com](https://kubackicollective.com) is a static S3 + CloudFront site (see [ARCHITECTURE.md](../../ARCHITECTURE.md)). Use an approved AWS profile with least privilege, and never store credentials in the repository or paste them into logs.

## 1. Prepare a release artifact

1. Check out the merged commit and ensure `git status --short` is empty. Use Node.js 24 and the committed lockfile.
2. `npm ci`
3. `npm test`, `npm run build:public`, then `npm run test:e2e` (see [testing.md](../testing.md)).
4. Confirm in `out.manifest.json` that `source_commit` is the intended commit and `source_dirty` is `false`.
5. `npm run preview:public` and review the pages at phone and desktop widths.

Keep the manifest and test output with the release record. The manifest is not uploaded to the site.

## 2. Take a rollback copy

Bucket versioning is off, so copy the current production objects to a local directory before changing anything. Do not publish this copy.

```sh
aws s3 sync "s3://$SITE_BUCKET" "$BACKUP_DIR" --profile "$AWS_PROFILE" --region "$AWS_REGION"
```

A synced copy does not keep redirect or cache metadata; `scripts/deploy-public.mjs` documents the values to restore.

## 3. Upload

Set the operator environment. The bucket is `kubackicollective.com` in `us-west-2`.

```sh
export AWS_PROFILE=<approved-profile> AWS_REGION=us-west-2 SITE_BUCKET=kubackicollective.com
```

Review the dry run, then apply it:

```sh
node scripts/deploy-public.mjs
node scripts/deploy-public.mjs --apply
```

The script refuses a dirty checkout, dirty or mismatched manifest, duplicate keys, and keys that could escape the export directory. It sets MIME type and cache headers, uploads assets before pages and `index.html` last, and gives each legacy `route.html` key S3 website redirect metadata pointing to `/route/`. It never deletes. Old hashed bundles stay in place for cached clients; do not use `aws s3 sync --delete`.

Retiring a published file is a separate, explicit step. Delete exactly the named key and record it:

```sh
aws s3api delete-object --bucket "$SITE_BUCKET" --key <retired-key> --profile "$AWS_PROFILE" --region "$AWS_REGION"
```

## 4. Invalidate CloudFront

Find the distribution whose alias is `kubackicollective.com`, invalidate, and wait. The CloudFront API uses `us-east-1`.

```sh
DISTRIBUTION_ID=$(aws cloudfront list-distributions --profile "$AWS_PROFILE" --region us-east-1 --query "DistributionList.Items[?contains(Aliases.Items, 'kubackicollective.com')].Id | [0]" --output text)
```

```sh
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths '/*' --profile "$AWS_PROFILE" --region us-east-1 --query Invalidation.Id --output text)
```

```sh
aws cloudfront wait invalidation-completed --distribution-id "$DISTRIBUTION_ID" --id "$INVALIDATION_ID" --profile "$AWS_PROFILE" --region us-east-1
```

## 5. Verify production

```sh
npx playwright test --config playwright.release.config.ts
```

Also check over HTTPS that:

- every manifest file is served with the recorded SHA-256 and the expected `Content-Type`;
- both portrait carousels show the shirt concept first;
- each legacy `.html` URL redirects to its directory URL;
- retired asset URLs no longer return the file (an unknown key returns 404 with the homepage document);
- the company attribution is visible and no CareerOS content appears.

Record the source commit, manifest, deleted keys, invalidation ID, check results, and timestamp in the GitHub release.

## Rollback

Upload the previous known-good artifact (from its release asset, or the local copy from step 2) with the same MIME, cache, and redirect metadata, invalidate, and verify again. Do not restore a file that was deliberately retired. Record the reason and open a follow-up issue.

## Security notes

A static export removes a server runtime from this hosting path. It does not fix dependency, S3-origin, header, IAM, logging, or DNS risks. See the [security review](../security/2026-11-25-review.md) and [tracker #10](https://github.com/themarcuszane/Kubacki-Collective/issues/10).
