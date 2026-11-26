# Public site release and rollback

Production for [kubackicollective.com](https://kubackicollective.com) is a static S3 + CloudFront site (see [ARCHITECTURE.md](../../ARCHITECTURE.md)). Use an approved AWS profile with least privilege, and never store credentials in the repository or paste them into logs.

## 1. Prepare a release artifact

1. Use the `kubacki-collective-public-<commit>` artifact from the successful `main` CI run for the exact merged commit being released. The run must show green results for `test`, full/production dependency audits, history/artifact secret scanning, CodeQL, and the attestation job. Download the ZIP, `out.manifest.json`, and `SHA256SUMS` together.
2. Verify checksums and provenance against the intended merge commit. Set `RELEASE_COMMIT` to that exact GitHub merge SHA, then run:

   ```sh
   shasum -a 256 --check SHA256SUMS
   RELEASE_COMMIT='paste-exact-main-merge-commit-here'
   test "$(python3 -c 'import json; print(json.load(open("out.manifest.json"))["source_commit"])')" = "$RELEASE_COMMIT"
   test "$(python3 -c 'import json; print(json.load(open("out.manifest.json"))["source_dirty"])')" = "False"
   gh attestation verify kubacki-collective-public-<commit>.zip --repo themarcuszane/Kubacki-Collective --signer-workflow themarcuszane/Kubacki-Collective/.github/workflows/ci.yml --source-ref refs/heads/main --source-digest "$RELEASE_COMMIT" --deny-self-hosted-runners
   gh attestation verify out.manifest.json --repo themarcuszane/Kubacki-Collective --signer-workflow themarcuszane/Kubacki-Collective/.github/workflows/ci.yml --source-ref refs/heads/main --source-digest "$RELEASE_COMMIT" --deny-self-hosted-runners
   ```

   These checks bind both files to the main branch CI workflow and the exact source commit; do not accept a PR run, another workflow, or a different source digest. Extract the ZIP into `out/` without changing its files. Keep the CI run URL, manifest, checksums, and verification output with the release record.

For a local candidate, check out the exact commit with an empty `git status --short`, use Node.js 24 and the committed lockfile, then run `npm ci`, `npm test`, `npm run build:public`, `npm run test:e2e`, and `python3 scripts/package-release.py`. Review `npm run preview:public` at phone and desktop widths. The CI artifact is built and tested in the same job before packaging.

Keep the manifest and test output with the release record. The manifest is not uploaded to the site.

## 2. Take a rollback copy

Bucket versioning is off, so copy current object bodies and capture each object's actual metadata before changing anything. This snapshot stays private and is not published. A recursive body sync alone is insufficient for restore because S3 website redirect, cache, content, and custom metadata must match the originals.

```sh
aws s3 sync "s3://$SITE_BUCKET" "$BACKUP_DIR" --profile "$AWS_PROFILE" --region "$AWS_REGION"
aws s3api list-objects-v2 --bucket "$SITE_BUCKET" --profile "$AWS_PROFILE" --region "$AWS_REGION" --output json > "$BACKUP_DIR/list-objects-v2.json"
python3 - "$SITE_BUCKET" "$AWS_PROFILE" "$AWS_REGION" "$BACKUP_DIR" <<'PY'
import base64, json, pathlib, subprocess, sys
bucket, profile, region, backup = sys.argv[1:]
backup = pathlib.Path(backup)
inventory = json.loads((backup / "list-objects-v2.json").read_text())
metadata_dir = backup / "object-metadata"
metadata_dir.mkdir(parents=True, exist_ok=True)
for item in inventory.get("Contents", []):
    key = item["Key"]
    common = ["aws", "s3api", "--profile", profile, "--region", region]
    head = subprocess.run(common + ["head-object", "--bucket", bucket, "--key", key, "--output", "json"], check=True, capture_output=True, text=True)
    tags = subprocess.run(common + ["get-object-tagging", "--bucket", bucket, "--key", key, "--output", "json"], check=True, capture_output=True, text=True)
    name = base64.urlsafe_b64encode(key.encode()).decode().rstrip("=") + ".json"
    record = {"key": key, "head_object": json.loads(head.stdout), "tagging": json.loads(tags.stdout)}
    (metadata_dir / name).write_text(json.dumps(record, indent=2) + "\n")
print(f"Saved metadata for {len(inventory.get('Contents', []))} objects")
PY
```

The AWS CLI paginates `list-objects-v2`; the saved inventory must include all pages. The capture loop saves exact `head-object` and tagging responses under base64-encoded key filenames, so spaces, slashes, and Unicode are preserved safely. Confirm the saved metadata count matches the inventory before upload. Preserve `ContentType`, `CacheControl`, `ContentEncoding`, `ContentDisposition`, `Expires`, custom `Metadata`, tags, and `WebsiteRedirectLocation` exactly as returned. The legacy `.html` objects use `WebsiteRedirectLocation`; cache metadata can differ by key. Restore using the saved values rather than inferring them from the current script or artifact.

## 3. Upload

Set the operator environment. The bucket is `kubackicollective.com` in `us-west-2`.

```sh
export AWS_PROFILE=<approved-profile> AWS_REGION=us-west-2 SITE_BUCKET=kubackicollective.com
```

Review the dry run, then apply it:

```sh
node scripts/deploy-public.mjs
```

The script refuses a dirty checkout, dirty or mismatched manifest, duplicate keys, and keys that could escape the export directory. Before `--apply`, review the SHA-256 digest of the downloaded manifest and pass that exact value to the command:

```sh
shasum -a 256 out.manifest.json
# Set this to the reviewed 64-character digest printed above.
EXPECTED_MANIFEST_SHA256='paste-reviewed-digest-here'
node scripts/deploy-public.mjs --apply --expected-manifest-sha256="$EXPECTED_MANIFEST_SHA256"
```

The digest is checked against the manifest bytes before any AWS upload begins. The script sets MIME type and cache headers, uploads assets before pages and `index.html` last, and gives each legacy `route.html` key S3 website redirect metadata pointing to `/route/`. It never deletes. Old hashed bundles stay in place for cached clients; do not use `aws s3 sync --delete`.

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
