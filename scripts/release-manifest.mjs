import { createHash } from 'node:crypto';

export function assertExpectedManifestDigest(manifestBytes, expectedDigest) {
  if (!/^[a-f0-9]{64}$/.test(expectedDigest ?? '')) {
    throw new Error('A reviewed --expected-manifest-sha256 value is required with --apply');
  }
  const actual = createHash('sha256').update(manifestBytes).digest('hex');
  if (actual !== expectedDigest) throw new Error(`Manifest digest does not match reviewed SHA-256: ${actual}`);
  return actual;
}
