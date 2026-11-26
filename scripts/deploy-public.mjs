// Upload a validated public export to the S3 website bucket. Dry run unless --apply is given.
// Never deletes objects. See docs/operations/release.md.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertExpectedManifestDigest } from './release-manifest.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { AWS_PROFILE: profile, AWS_REGION: region, SITE_BUCKET: bucket } = process.env;
const apply = process.argv.includes('--apply');
const expectedDigestFlag = process.argv.find(arg => arg.startsWith('--expected-manifest-sha256='));
const expectedManifestDigest = expectedDigestFlag?.slice('--expected-manifest-sha256='.length);
if (!profile || !region || !bucket) throw new Error('Set AWS_PROFILE, AWS_REGION and SITE_BUCKET');

const manifestBytes = await readFile(path.join(repo, 'out.manifest.json'));
if (apply) assertExpectedManifestDigest(manifestBytes, expectedManifestDigest);
const manifest = JSON.parse(manifestBytes.toString('utf8'));
const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim();
if (manifest.source_dirty) throw new Error('Manifest was built from a dirty tree');
if (manifest.source_commit !== head) throw new Error('Manifest commit does not match HEAD');
const status = execFileSync('git', ['status', '--porcelain'], { cwd: repo, encoding: 'utf8' });
if (status.trim()) throw new Error('Current source tree is dirty');
if (!Array.isArray(manifest.files)) throw new Error('Manifest files must be an array');

const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
};
const keys = new Set();
for (const file of manifest.files) {
  if (typeof file.key !== 'string' || file.key.length === 0 || file.key.startsWith('/') || file.key.includes('\\') || /[\u0000-\u001f\u007f]/.test(file.key)) {
    throw new Error(`Invalid manifest key: ${String(file.key)}`);
  }
  const segments = file.key.split('/');
  if (segments.some(segment => !segment || segment === '.' || segment === '..')) throw new Error(`Invalid manifest key: ${file.key}`);
  if (keys.has(file.key)) throw new Error(`Duplicate manifest key: ${file.key}`);
  keys.add(file.key);
}

// A legacy `route.html` alias redirects to `/route/`. The error documents are served directly.
function redirectFor(key) {
  if (!key.endsWith('.html') || key.endsWith('index.html') || key === '404.html' || key === '_not-found.html') return null;
  const route = key.slice(0, -'.html'.length);
  return keys.has(`${route}/index.html`) ? `/${route}/` : null;
}

function cacheFor(key) {
  if (key.startsWith('_next/static/')) return 'public,max-age=31536000,immutable';
  if (key.startsWith('images/')) return 'public,max-age=3600';
  return 'public,max-age=0,must-revalidate';
}

// Assets first, then page content, then redirect aliases, and the homepage last.
function phase(key) {
  if (key === 'index.html') return 4;
  if (key.startsWith('_next/') || key.startsWith('images/')) return 0;
  return redirectFor(key) ? 2 : 1;
}

const plan = [];
for (const file of manifest.files) {
  const local = path.join(repo, 'out', file.key);
  const digest = createHash('sha256').update(await readFile(local)).digest('hex');
  if (digest !== file.sha256) throw new Error(`Local file differs from manifest: ${file.key}`);
  const contentType = types[path.extname(file.key).toLowerCase()];
  if (!contentType) throw new Error(`No content type for ${file.key}`);
  plan.push({ key: file.key, local, contentType, cache: cacheFor(file.key), redirect: redirectFor(file.key), phase: phase(file.key) });
}
plan.sort((a, b) => a.phase - b.phase || a.key.localeCompare(b.key));

for (const item of plan) {
  if (apply) {
    const args = ['s3api', 'put-object', '--profile', profile, '--region', region, '--bucket', bucket, '--key', item.key,
      '--body', item.local, '--content-type', item.contentType, '--cache-control', item.cache];
    if (item.redirect) args.push('--website-redirect-location', item.redirect);
    execFileSync('aws', args, { stdio: ['ignore', 'ignore', 'inherit'] });
  }
  console.log(`${apply ? 'put' : 'plan'} ${item.phase} ${item.key}${item.redirect ? ` -> ${item.redirect}` : ''}`);
}
console.log(`${apply ? 'Uploaded' : 'Would upload'} ${plan.length} objects, ${plan.filter(i => i.redirect).length} with redirects, from ${head}`);
