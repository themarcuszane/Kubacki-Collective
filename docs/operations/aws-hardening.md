# Kubacki Collective AWS and GitHub hardening plan

Read-only work completed 2026-11-26. Site identity: **Kubacki Collective — By TeamDryBox LLC**. Production host: `kubackicollective.com`; separate CareerOS scaffold excluded from the public release.

## Current AWS verification

Read profile `kubaki`, S3 us-west-2, CloudFront us-east-1. AWS queries succeeded after the approved network escalation. No AWS setting, release, edge function, policy, log destination, object, or DNS record was changed.

- CloudFront `E2E4WG0HEGJXIN` is deployed and enabled for apex + `www`; HTTP redirects to HTTPS; minimum TLS `TLSv1.3_2025`; GET/HEAD only; default root `index.html`; no extra cache behaviors.
- Origin is `kubackicollective.com.s3-website-us-west-2.amazonaws.com`, a custom origin using `http-only`. No OAC, CloudFront Function/Lambda@Edge, response headers policy, legacy access logging, or real-time log association. WAF attached.
- Bucket is public-read: bucket PAB all false, policy status public; account-level PAB query returned `NoSuchPublicAccessBlockConfiguration`. Ownership `BucketOwnerEnforced`; SSE-S3 AES256 default on, SSE-C blocked.
- S3 versioning has no status (disabled); S3 server access logging has no destination. Prior sanitized review records website index `index.html`, error document `index.html`. Fresh paginated inventory: 307 objects / 8,325,021 bytes. Precise selected keys: `.DS_Store`, `images/.DS_Store`, `images/.gitkeep`, `images/hero/.gitkeep`, `_next/static/chunks/a6dad97d9634a72d.js.map`. Do not delete during origin migration.
- WAF default Allow; three AWS managed groups (IP reputation, Common Rule Set, Known Bad Inputs), metrics and sampled requests enabled. Persistent WAF logging query: `AccessDenied`.
- Current IAM user `kubaki` can call `GetUser`; `ListAttachedUserPolicies` is `AccessDenied`. Effective/attached/inline/group policies, credential age, MFA and deployment trust could not be inspected. This is a visibility limit, not evidence of absent/excessive policy.
- CloudTrail `DescribeTrails`, Route 53 `ListHostedZones`, CloudWatch Logs `DescribeDeliverySources`: `AccessDenied`. CloudFront v2 delivery and authoritative DNS/registrar protections remain unverified. Do not describe these as absent.

## GitHub verification and parent changes

GitHub connector confirmed repo `themarcuszane/Kubacki-Collective`, default `main`, and no rulesets in the read made here. Branch-protection GET returned `403 Resource not accessible by integration`; the connector cannot attest protection. Prior sanitized report recorded no protection, Dependabot alerts/security updates disabled, secret scanning + push protection enabled, and failing CI.

Parent has since applied and verified: PR required, zero independent reviews (sole-maintainer compatible), strict required `GitHub Actions / test` context, admin enforcement, force-push/deletion blocked, conversation resolution, Dependabot alerts and security updates enabled. Do not reapply. Record parent's evidence as current state; API 403 is an access limit, not a contradiction.

## SEC-01: private S3 REST origin behind OAC

AWS requires a regular S3 bucket origin (not the website endpoint), `BucketOwnerEnforced`, OAC `SigningBehavior=always`, and bucket policy restricted to the intended distribution.

### Proposed rollout

1. Capture full current CloudFront config + ETag, bucket policy, website config, PAB, and smoke tests in a protected change record. Prepare rollback first.
2. Create an S3 OAC using SigV4 and `always`; add a regular REST origin `kubackicollective.com.s3.us-west-2.amazonaws.com`.
3. Add a temporary bucket policy permitting `cloudfront.amazonaws.com` `s3:GetObject` on `arn:aws:s3:::kubackicollective.com/*`, conditioned on the exact distribution SourceArn. Retain existing anonymous read and keep bucket/account PAB false during propagation/validation.
4. Associate the viewer-request CloudFront Function below and switch default origin to REST. Do not grant `s3:ListBucket`. Configure both CloudFront custom errors 403 and 404 to fetch `/404.html`, return status `404`, and set `ErrorCachingMinTTL=0`. This preserves a real missing-route 404 without exposing list permission. It intentionally changes the missing-page body from the current homepage fallback to the already approved, restyled `/404.html` while keeping HTTP status 404; include this visible body change in the approval and release plan. An origin policy error may also turn into 404: verify `/index.html`, `/404.html`, and representative asset paths return 200 through OAC; verify an unknown route shows `/404.html` with status 404 and use a synthetic canary/monitor for homepage and key assets so a broken OAC cannot look like an ordinary missing URL.
5. Leave all currently published keys, prior hashed chunks, and legacy redirect objects intact; the release helper has no object-deletion phase, so cached clients retain their assets. Validate through CloudFront: `/`, `/collective`, `/collective/`, all chapter/journal details, `/start/`, static assets, 17 legacy aliases below, query-string preservation, true missing path (status 404), branding and browser console. Check anonymous website and direct REST reads fail while CloudFront succeeds.
6. Only after all validation, remove anonymous `s3:GetObject` and set all four bucket PAB flags true. Verify direct origin denial and site again. Account-level PAB impacts the whole account and needs its own admin decision.

### CloudFront Function proposal

Attach to default behavior `ViewerRequest`. Generate/freeze alias and directory maps from the release manifest; do not infer aliases from arbitrary path text. The current candidate release manifest yields these 17 old `.html` mappings. Test event/query encoding in a nonproduction distribution or function test tool before association. Query stays on the request object during URI rewrite. Runtime 2.0 `request.rawQueryString()` preserves redirect query bytes verbatim, including percent-encoding, duplicate keys, empty values, and UTF-8; it avoids double encoding.

```js
// CloudFront Functions JavaScript runtime 2.0.
// Viewer-request handler for the Kubacki Collective static S3 REST origin.
var LEGACY = {
  "/chapters.html": "/chapters/",
  "/chapters/chapter-01-signals.html": "/chapters/chapter-01-signals/",
  "/chapters/cinematic.html": "/chapters/cinematic/",
  "/chapters/publishing.html": "/chapters/publishing/",
  "/chapters/systems.html": "/chapters/systems/",
  "/collective.html": "/collective/",
  "/journal.html": "/journal/",
  "/journal/2026-01-studio-note-01.html": "/journal/2026-01-studio-note-01/",
  "/journal/aesthetic-rules.html": "/journal/aesthetic-rules/",
  "/journal/hero-rhythm.html": "/journal/hero-rhythm/",
  "/journal/kubacki-aesthetic-rules.html": "/journal/kubacki-aesthetic-rules/",
  "/journal/mdx-publishing.html": "/journal/mdx-publishing/",
  "/journal/not-for-everyone-note.html": "/journal/not-for-everyone-note/",
  "/journal/not-for-everyone.html": "/journal/not-for-everyone/",
  "/journal/ship-first.html": "/journal/ship-first/",
  "/journal/what-we-ship-first.html": "/journal/what-we-ship-first/",
  "/start.html": "/start/"
};
var DIRS = {
  "/chapters": true, "/chapters/chapter-01-signals": true,
  "/chapters/cinematic": true, "/chapters/publishing": true,
  "/chapters/systems": true, "/collective": true, "/journal": true,
  "/journal/2026-01-studio-note-01": true, "/journal/aesthetic-rules": true,
  "/journal/hero-rhythm": true, "/journal/kubacki-aesthetic-rules": true,
  "/journal/mdx-publishing": true, "/journal/not-for-everyone-note": true,
  "/journal/not-for-everyone": true, "/journal/ship-first": true,
  "/journal/what-we-ship-first": true, "/start": true
};
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function rawQuerySuffix(request) {
  // runtime 2.0 returns the original encoded query verbatim, including duplicate,
  // empty, flag-only, and UTF-8 percent-encoded parameters. Do not encode it again.
  var raw = request.rawQueryString();
  return raw === undefined ? "" : "?" + raw;
}
function redirect(uri, request) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: { value: uri + rawQuerySuffix(request) },
      "cache-control": { value: "public, max-age=300" }
    }
  };
}
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (hasOwn(LEGACY, uri)) return redirect(LEGACY[uri], request);
  if (hasOwn(DIRS, uri)) return redirect(uri + "/", request);
  if (uri === "/") request.uri = "/index.html";
  else if (uri.charAt(uri.length - 1) === "/") request.uri = uri + "index.html";
  return request;
}
```

Unknown paths are left unmapped to preserve 404 behavior. `/` and slash-terminated page routes rewrite to static `index.html`; actual files/assets pass unchanged. New routes require regenerating both maps. Website endpoint redirects/index behavior do not run on REST.

### S3 bucket policy target (template)

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowOnlyKubackiCloudFrontRead",
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::kubackicollective.com/*",
    "Condition": { "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::<ACCOUNT_ID>:distribution/E2E4WG0HEGJXIN"
    }}
  }]
}
```

Keep `s3:ListBucket` out unless expressly chosen for 404 distinction. Do not remove anonymous read or enable bucket PAB before the private path works. Use separately reviewed temporary (public+OAC) and final (OAC only) policies.

### Rollback

Before bucket PAB changes, rollback by restoring the captured CloudFront configuration with the then-current ETag. If PAB was already enabled: (1) first reset the four bucket PAB settings to the captured values (currently all false); (2) restore the captured public-read policy while retaining the OAC statement; (3) verify the S3 website endpoint returns the expected homepage; (4) only then switch CloudFront back to the captured website-origin configuration; (5) wait for deployment and smoke-test. Do not switch CloudFront to the website endpoint before public reads work. Keep the OAC statement and all objects until a separate approved cleanup. Invalidate only if cache evidence requires it. Never `sync --delete`, delete redirect objects, or remove old hashed assets during rollback.

## SEC-02: edge headers, CSP and HSTS

Attach one reviewed CloudFront Response Headers Policy to the default behavior and all future behaviors:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()` as a custom header
- Start HSTS at `max-age=300`, no `includeSubDomains`/`preload`; increase only after HTTPS is checked on all affected names.
- Start CSP as custom `Content-Security-Policy-Report-Only`; inventory inline scripts/styles in exact release and generate `sha256-...` script hashes reproducibly. Static response can't provide per-request nonce. Candidate: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self' data:; style-src 'self'; style-src-attr 'unsafe-inline'; script-src 'self' <generated inline script hashes>; connect-src 'self'`. Remove allowances unsupported by artifact/browser evidence. No `report-to`/`report-uri` until a real collection endpoint exists; inspect browser console, then enforce.

Preview-test root, directory/detail routes, fonts/images/scripts, navigation, console and errors. Roll back by detaching/restoring the previous policy. HSTS rollback cannot retract cached client state immediately; start short and avoid subdomain/preload.

## SEC-07: recovery

Versioning is disabled. Keep the existing private output backup (prior report: 293 objects including metadata) and immutable release artifact/manifest. Cost-bounded proposal for approval: enable bucket versioning and expire noncurrent versions after 30 days while retaining the newest three noncurrent versions per key (review with real release cadence and budget first). Versioning is bucket-wide, stores full object versions, and cannot return to never-versioned. Apply lifecycle only after a restore test to a separate prefix/bucket, including routes, redirects, branding and cache. An immutable release in the same AWS trust boundary is not an independently controlled backup. No versioning/lifecycle settings have been changed.

## Logging and restricted checks

CloudFront legacy logging is disabled; v2 not verified; WAF durable logs/CloudTrail inventory/Route 53 discovery denied. `aws configure list-profiles` returned only names `default`, `marcus-admin`, and `kubaki`; a read-only STS request for `marcus-admin` failed because its SSO token is expired and refresh failed. No login/browser auth was launched. The admin refresh command for an authorized operator is `aws sso login --profile marcus-admin`; do not resume admin queries until a current session exists. Retain WAF metrics/sampling. Have an authorized admin/read-only audit identity verify central destinations/retention before configuring more. Required admin/read-only verification should include IAM effective policies, attached and inline policies, groups, key last-used and MFA metadata; WAF `GetLoggingConfiguration`; CloudWatch Logs `DescribeDeliverySources`, `DescribeDeliveryDestinations`, and `DescribeDeliveries`; CloudTrail `DescribeTrails`, `GetTrailStatus`, and `GetEventSelectors`; and Route 53 `ListHostedZones`/`ListResourceRecordSets` plus registrar protections. Prefer one CloudFront standard-v2 sink with least privilege, 30-day initial retention review, and budget alert; document existing equivalent logs instead of duplicating. Include only necessary request fields and avoid cookies unless a documented use case exists. WAF persistent logging and CloudTrail management/data events need separate cost-reviewed decisions. After approval, send a harmless request and verify actual delivery.

## User-visible 404 behavior in this proposal

The live S3 website currently uses `index.html` as its error document, so unknown routes return homepage HTML with status 404. The proposed CloudFront REST origin uses the approved restyled `404.html`, also with status 404. This retains not-found status and branding while changing the error-page body; include that deliberate change in the user's AWS change approval and release notes.

## Approval required

Read-only verification and this proposal are authorized. Per the persistent constraint, OAC creation, CloudFront updates/function association, bucket policy or PAB changes, response header policy, versioning/lifecycle, logging destinations, and any deletion require explicit user approval. The proposed lifecycle rule permanently deletes noncurrent S3 object versions after 30 days once more than three newer noncurrent versions exist; this deletion policy requires separate, explicit approval and must not be bundled with enabling versioning. No deletion is authorized. `.DS_Store`, `.gitkeep`, old HTML, source map, and old hashed assets stay inventoried for separate review; deploy helper must not delete.

## Concrete config and test artifacts

These companion files are proposals only; placeholders such as `<ACCOUNT_ID>` and `<OAC_ID>` must be resolved from verified configuration before any operator prepares a change. They have not been applied:

- [CloudFront Function](../../infra/aws/cloudfront-function.js) and [its standalone test](../../infra/aws/test-cloudfront-function.mjs)
- [OAC config](../../infra/aws/oac-config.json), [temporary bucket policy](../../infra/aws/bucket-policy-temporary.json), [final bucket policy](../../infra/aws/bucket-policy-final.json), and [final public-access block](../../infra/aws/public-access-block-final.json)
- [CloudFront patch fragments](../../infra/aws/cloudfront-patch-fragments.json) include the S3 REST origin, function/RHP association, and 403/404 custom-error parameters. They use `TargetOriginId` and `FunctionARN` with the LIVE-published CloudFront Function ARN (no Lambda version suffix). Nested keys were checked against the installed AWS CLI CloudFront `update-distribution --generate-cli-skeleton input` model; the offline model check also covered OAC, both RHP shapes, S3 lifecycle and PAB, and both bucket-policy JSON files passed syntax parsing. This is a partial fragment, not a complete `DistributionConfig`; merge it into the captured live config before any update. The custom-error page is `/404.html`, response code `404`, minimum error-cache TTL `0`; no `s3:ListBucket` grant.
- [Report-only response headers policy](../../infra/aws/response-headers-policy-report-only.json) and [enforcing template](../../infra/aws/response-headers-policy-enforcing-template.json)
- [Lifecycle proposal](../../infra/aws/lifecycle-noncurrent-30d-3.json): proposed noncurrent-version expiry after 30 days while retaining three newer versions; it requires a prefix filter (empty prefix means all keys). This permanently deletes old versions and requires separate explicit approval.
- The candidate `csp-preview-hashes.txt` was deliberately not copied: those hashes are stale candidate-build values, not production evidence. Derive and review CSP hashes from the exact release ZIP that is proposed for deployment, inspect browser report-only violations, and only then prepare an enforcing policy.
- [AWS CLI model validator](../../infra/aws/validate-aws-cli-models.py) checks template keys against the installed AWS CLI service model without calling AWS.

The standalone Node unit checks passed with 52 assertions: two per each of the 17 aliases; query values with encoded spaces, `%2F`, `%252F`, UTF-8, duplicate values, empty names/values and flag-only values; root and known-directory rewrites; assets; and unknown paths. These tests do not publish/test a CloudFront function or validate AWS edge behavior.

## Official AWS references

- [OAC for S3 origins and bucket policy scope](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)
- [CloudFront Functions request event and URI rewriting](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-event-structure.html)
- [CloudFront Functions runtime 2.0 raw query helper](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-20.html)
- [CloudFront edge-function query encoding](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-function-restrictions-all.html)
- [CloudFront response headers policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/creating-response-headers-policies.html)
- [CloudFront standard logging v2](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/standard-logging.html)
- [CloudFront custom error page behavior](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/creating-custom-error-pages.html)
- [S3 noncurrent-version expiration rules](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html)
- [S3 Versioning and storage/retention behavior](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)

### Candidate static CSP inventory (not production evidence)

The prior read-only parse of a candidate public export found 39 HTML files, 78 inline script blocks, 20 unique nonempty script hashes, zero inline `<style>` blocks, 24 `style` attributes, and no external origins. These counts are provisional and are not current production evidence. Regenerate the inventory against the exact release ZIP proposed for deployment and inspect browser report-only violations before enforcing CSP. The 24 inline style attributes mean style attributes need their own reviewed allowance (for example `style-src-attr 'unsafe-inline'`) or code cleanup; do not weaken `script-src` with `'unsafe-inline'`.
