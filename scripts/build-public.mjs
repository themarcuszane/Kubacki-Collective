import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, symlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stage = await mkdtemp(path.join(repo, '.collective-export-'));
const out = path.join(repo, 'out');
const manifestPath = path.join(repo, 'out.manifest.json');
const allowlist = [
  'package.json', 'package-lock.json', 'tsconfig.json', 'postcss.config.mjs',
  'tailwind.config.ts', 'mdx-components.tsx', 'content', 'public',
  'app/layout.tsx', 'app/page.tsx', 'app/globals.css', 'app/not-found.tsx',
  'app/collective', 'app/start', 'app/chapters', 'app/journal',
  'components/Header.tsx', 'components/Footer.tsx', 'components/Hero.tsx',
  'components/HeroOverlay.tsx', 'components/Mark.tsx', 'components/Reveal.tsx',
  'components/SiteBackground.tsx', 'components/StaggerGroup.tsx',
  'components/public-site-shell.tsx', 'components/home', 'components/collective',
  'components/mdx', 'components/ui',
  'lib/content.ts', 'lib/public-images.ts', 'lib/motion.ts', 'lib/theme.ts', 'lib/utils.ts',
];

async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...await files(full));
    else if (entry.isFile()) result.push(full);
    else throw new Error(`Unexpected export entry: ${full}`);
  }
  return result;
}

try {
  for (const entry of allowlist) {
    await mkdir(path.dirname(path.join(stage, entry)), { recursive: true });
    await cp(path.join(repo, entry), path.join(stage, entry), { recursive: true });
  }
  await symlink(path.join(repo, 'node_modules'), path.join(stage, 'node_modules'), 'dir');
  await writeFile(path.join(stage, 'next.config.js'), `
const withMDX = require('@next/mdx')({ extension: /\\.(md|mdx)$/ });
module.exports = withMDX({ output: 'export', trailingSlash: true, pageExtensions: ['ts','tsx','js','jsx','md','mdx'], images: { unoptimized: true }, outputFileTracingRoot: __dirname });
`);
  const result = spawnSync(process.execPath, [path.join(repo, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], { cwd: stage, stdio: 'inherit' });
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else {
    const stagedOut = path.join(stage, 'out');
    for (const file of await files(stagedOut)) {
      if (path.basename(file).startsWith('.') || file.endsWith('.map')) await rm(file);
    }
    for (const file of await files(stagedOut)) {
      const relative = path.relative(stagedOut, file).split(path.sep).join('/');
      if (relative.endsWith('/index.html') && !relative.startsWith('404/')) {
        await cp(file, path.join(stagedOut, relative.replace(/\/index\.html$/, '.html')));
      }
    }
    const prohibited = new Set(['auth', 'dashboard', 'onboarding', 'opportunities', 'pipeline', 'settings', 'sign-in', 'sign-up', 'api']);
    const manifestFiles = [];
    for (const file of (await files(stagedOut)).sort()) {
      const key = path.relative(stagedOut, file).split(path.sep).join('/');
      if (key.split('/').some(p => p.startsWith('.')) || prohibited.has(key.split('/')[0]) || key.endsWith('.map')) throw new Error(`Disallowed artifact: ${key}`);
      const bytes = await readFile(file);
      if (bytes.includes(Buffer.from('inventor.jpeg'))) throw new Error(`Removed inventor asset reference in artifact: ${key}`);
      if (/\.(html|txt|js|json)$/.test(key) && bytes.includes(Buffer.from('CareerOS'))) throw new Error(`Scaffold branding in artifact: ${key}`);
      manifestFiles.push({ key, bytes: bytes.byteLength, sha256: createHash('sha256').update(bytes).digest('hex') });
    }
    for (const key of ['index.html', 'collective/index.html', 'collective.html', 'chapters/index.html', 'journal/index.html', 'start/index.html']) {
      const html = await readFile(path.join(stagedOut, key), 'utf8');
      if (!html.includes('Kubacki Collective') || !html.includes('By TeamDryBox LLC')) throw new Error(`Branding missing: ${key}`);
    }
    const git = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: repo, encoding: 'utf8' });
    if (git.status !== 0) throw new Error('Cannot determine release commit');
    const dirty = spawnSync('git', ['status', '--porcelain'], { cwd: repo, encoding: 'utf8' });
    const manifest = { source_commit: git.stdout.trim(), source_dirty: Boolean(dirty.stdout.trim()), node: process.version, build_command: 'next build --webpack', config: { output: 'export', trailingSlash: true, images: { unoptimized: true } }, source_allowlist: allowlist, files: manifestFiles };
    await rm(out, { recursive: true, force: true });
    await rename(stagedOut, out);
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`PUBLIC_EXPORT=${out}`);
    console.log(`MANIFEST=${manifestPath}`);
  }
} finally {
  await rm(stage, { recursive: true, force: true });
}
