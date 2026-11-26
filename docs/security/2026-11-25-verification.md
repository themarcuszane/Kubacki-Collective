# Reproducing the November 25, 2026 security review

These are read-only checks. Run against the intended source commit and authorized AWS account. Never include credentials in output or commits. Tool versions used: Gitleaks 8.30.1, npm 11.19.1, Node 24.22.1; AWS CLI/GitHub CLI, curl and OpenSSL were used for configuration/transport checks. Source commit and sanitized results are in the report/evidence.

## Public endpoint checks

```sh
curl -sS -D - -o /dev/null https://kubackicollective.com/
curl -sS -D - -o /dev/null http://kubackicollective.com/
curl -sS -D - -o /dev/null https://kubackicollective.com/collective/
curl -sS -D - -o /dev/null https://kubackicollective.com/.env
curl -sS -D - -o /dev/null https://kubackicollective.com/.git/config
curl -sS -D - -o /dev/null https://kubackicollective.com/sign-in/
curl -sS -D - -o /dev/null https://kubackicollective.com/.DS_Store
openssl s_client -connect kubackicollective.com:443 -servername kubackicollective.com -verify_hostname kubackicollective.com -verify_return_error -tls1_3 -brief </dev/null
```

Record status, relevant headers, final URL and body hash. A homepage-looking 404 is not an exposed `.env`. Enumerate scripts from the current HTML before checking their adjacent `.map` files; filenames change between releases. The evidence contains the exact checked URLs.

## Repository checks

```sh
git rev-parse HEAD
npm audit --json
npm audit --omit=dev --json
gitleaks git . --log-opts='--all' --redact=100 --report-format json --report-path /tmp/kubacki-history-gitleaks.json
npm test
npx tsc --noEmit --incremental false
gh api repos/themarcuszane/Kubacki-Collective/branches/main/protection
gh api repos/themarcuszane/Kubacki-Collective/rulesets
gh api repos/themarcuszane/Kubacki-Collective/actions/permissions/workflow
gh api repos/themarcuszane/Kubacki-Collective
gh api 'repos/themarcuszane/Kubacki-Collective/dependabot/alerts?state=open'
gh api 'repos/themarcuszane/Kubacki-Collective/secret-scanning/alerts?state=open' --jq '[.[] | {number,state,secret_type,validity}]'
gh api 'repos/themarcuszane/Kubacki-Collective/code-scanning/alerts?state=open'
gh api 'repos/themarcuszane/Kubacki-Collective/actions/runs?per_page=5'
```

Nonzero `npm audit` status means findings were reported; distinguish advisory findings from network/tool errors. Secret scans require false-positive triage and do not prove absence of secrets. Audit data changes over time.

The local path-confinement reproduction reads an existing public document and prints only whether it was reached:

```sh
node --input-type=module - <<'JS'
import { getContentBySlug } from './lib/content.ts';
const item = getContentBySlug('chapters', '../../ARCHITECTURE');
console.log({readOutsideContentDirectory: item.content.startsWith('# Kubacki Collective architecture')});
JS
```

Node must support TypeScript stripping for this command. It is a helper-level test, not an HTTP exploit test.

## AWS checks

Use a valid named profile in the correct account. The review discovered the target distribution by its aliases; do not select a different site's distribution. Read these operations with the appropriate region/profile:

- CloudFront `list-distributions`, `get-distribution`, `get-distribution-config`.
- S3 `get-public-access-block`, `get-bucket-policy`, `get-bucket-policy-status`, `get-bucket-acl`, `get-bucket-ownership-controls`, `get-bucket-encryption`, `get-bucket-versioning`, `get-bucket-logging`, `get-bucket-cors`, `get-bucket-website`, `get-bucket-lifecycle-configuration`, `get-bucket-replication`, and paginated `list-objects-v2` for `kubackicollective.com` in us-west-2.
- S3 Control account public-access-block configuration, using the verified account identity.
- WAFv2 `get-web-acl` and `get-logging-configuration` for the distribution's attached CLOUDFRONT-scope ACL in us-east-1.
- CloudWatch Logs `describe-delivery-sources`, CloudTrail trail/event coverage, authoritative Route53 records if hosted there, and the effective policies of the site's deployment identity. These additional reads were restricted in this review.

Download only published text assets to a temporary directory if rescanning deployment artifacts; run `gitleaks dir` with full redaction. Do not publish raw app bodies, metadata files, secret values, credential configuration, account identifiers, or raw admin logs as audit evidence. The report records relevant facts without them.

Do not change bucket policies, enable public-access blocking, delete old artifacts, or enforce CSP as part of merely reproducing the review. Each fix needs a rollout/rollback plan and post-change verification.
