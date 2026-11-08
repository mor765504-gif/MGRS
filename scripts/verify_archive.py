#!/usr/bin/env python3
"""Offline document checks; never run product code or make network requests."""
from __future__ import annotations
import hashlib
import json
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    errors: list[str] = []
    manifest = json.loads((ROOT / 'source-manifest.json').read_text(encoding='utf-8'))
    for row in manifest['sources']:
        path = ROOT / row['archive_path']
        if not path.is_file():
            errors.append('Missing archive: ' + row['archive_path'])
            continue
        raw = path.read_bytes()
        blob = hashlib.sha1(b'blob ' + str(len(raw)).encode() + b'\0' + raw).hexdigest()
        if blob != row['git_blob_sha1'] or hashlib.sha256(raw).hexdigest() != row['sha256']:
            errors.append('Changed source archive: ' + row['archive_path'])
    pages = list(ROOT.rglob('*.md'))
    local_count = 0
    for page in pages:
        raw = page.read_text(encoding='utf-8')
        text = re.sub(r'(?ms)^(```|~~~)[^\n]*\n.*?^\1\s*$', '', raw)
        for href in re.findall(r'(?<!!)\[[^\]\n]*\]\(([^)\s]+)\)', text):
            url = urlsplit(href)
            if url.scheme or url.netloc:
                continue
            local_count += 1
            target = (page.parent / unquote(url.path)).resolve() if url.path else page.resolve()
            if ROOT.resolve() not in [target, *target.parents]:
                errors.append(f'Outside package: {page.relative_to(ROOT)} -> {href}')
            elif not target.is_file():
                errors.append(f'Broken link: {page.relative_to(ROOT)} -> {href}')
            elif url.fragment:
                # The formatted pages use explicit stable anchors rather than renderer-specific slugs.
                body = target.read_text(encoding='utf-8')
                anchor = unquote(url.fragment)
                if f'id="{anchor}"' not in body:
                    errors.append(f'Unknown anchor: {page.relative_to(ROOT)} -> {href}')
    spec = (ROOT / 'MGRS.md').read_text(encoding='utf-8')
    if len(re.findall(r'^## \d+\. ', spec, re.M)) != 16:
        errors.append('Expected all 16 source chapters in MGRS.md')
    if len(re.findall(r'^\*\*G\d{2}\*\* ', spec, re.M)) != 14:
        errors.append('Expected all 14 invariants')
    for data in re.findall(r'(?ms)^~~~json\n(.*?)^~~~\s*$', spec):
        try:
            json.loads(data)
        except json.JSONDecodeError as exc:
            errors.append('Invalid example JSON: ' + str(exc))
    allowlist = ROOT / 'publish-files.txt'
    if allowlist.exists():
        for name in allowlist.read_text().splitlines():
            if name and (not (ROOT / name).is_file() or (ROOT / name).is_symlink()):
                errors.append('Invalid publication file: ' + name)
    if errors:
        print('\n'.join('ERROR: ' + e for e in errors), file=sys.stderr)
        return 1
    print(f'PASS: {len(manifest["sources"])} original Git blobs; 16 chapters; '
          f'14 invariants; {len(pages)} Markdown files; {local_count} local links/anchors.')
    print('Document checks only. No product, provider, deployment or remote publication tests.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(1)
