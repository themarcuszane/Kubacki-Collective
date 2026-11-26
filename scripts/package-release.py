#!/usr/bin/env python3
"""Package the clean public export, its manifest, and checksums for CI release review."""
import hashlib
import json
from pathlib import Path
import subprocess
import zipfile

root = Path(__file__).resolve().parent.parent
out = root / "out"
manifest_path = root / "out.manifest.json"
release = root / "release-artifact"
manifest = json.loads(manifest_path.read_text())
head = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True).strip()
dirty = subprocess.check_output(["git", "status", "--porcelain"], cwd=root, text=True).strip()
if dirty or manifest.get("source_dirty") or manifest.get("source_commit") != head:
    raise SystemExit("Refusing to package a dirty or mismatched source commit")
if not out.is_dir() or not isinstance(manifest.get("files"), list):
    raise SystemExit("Public export or file manifest is missing")

listed = {item["key"] for item in manifest["files"]}
actual = {p.relative_to(out).as_posix() for p in out.rglob("*") if p.is_file()}
if actual != listed:
    raise SystemExit("Export contents do not exactly match out.manifest.json")
for item in manifest["files"]:
    content = (out / item["key"]).read_bytes()
    if len(content) != item["bytes"] or hashlib.sha256(content).hexdigest() != item["sha256"]:
        raise SystemExit(f"Export file does not match manifest: {item['key']}")

if release.exists() and any(release.iterdir()):
    raise SystemExit("Refusing to package over existing release-artifact files")
release.mkdir(exist_ok=True)
archive = release / f"kubacki-collective-public-{head}.zip"
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as zf:
    for file in sorted(out.rglob("*")):
        if file.is_file():
            zf.write(file, file.relative_to(out).as_posix())
manifest_copy = release / "out.manifest.json"
manifest_copy.write_bytes(manifest_path.read_bytes())
checksums = []
for file in (archive, manifest_copy):
    checksums.append(f"{hashlib.sha256(file.read_bytes()).hexdigest()}  {file.name}")
(release / "SHA256SUMS").write_text("\n".join(checksums) + "\n")
print(f"RELEASE_ARCHIVE={archive}")
print(f"RELEASE_COMMIT={head}")
