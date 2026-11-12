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
    spec_files = sorted((ROOT / 'spec').glob('[0-9][0-9]-*.md'))
    if len(spec_files) != 16:
        errors.append(f'Expected 16 standalone chapters; got {len(spec_files)}')
    combined = []
    for number, page in enumerate(spec_files, 1):
        part = page.read_text(encoding='utf-8')
        combined.append(part)
        if not re.search(r'^## ' + str(number) + r'\. ', part, re.M):
            errors.append('Missing numbered heading: ' + page.name)
        if f'id="mgrs-{number}"' not in part:
            errors.append('Missing chapter anchor: ' + page.name)
        for data in re.findall(r'(?ms)^~~~json\n(.*?)^~~~\s*$', part):
            try:
                json.loads(data)
            except json.JSONDecodeError as exc:
                errors.append('Invalid example JSON in ' + page.name + ': ' + str(exc))
    invariants = re.findall(r'^\*\*G(\d{2})\*\* ', '\n'.join(combined), re.M)
    if sorted(invariants) != [f'{i:02d}' for i in range(1, 15)]:
        errors.append('Expected G01–G14 exactly once in spec chapters')
    index = (ROOT / 'MGRS.md').read_text(encoding='utf-8')
    legacy = (ROOT / 'docs/reference/mgrs-0.1-technical.md').read_text(encoding='utf-8')
    for number in range(1, 17):
        anchor = f'id="mgrs-{number}"'
        if anchor not in index or anchor not in legacy:
            errors.append('Missing index or legacy anchor: ' + anchor)
    if re.search(r'^## \d+\. ', legacy, re.M):
        errors.append('Legacy reference must not duplicate the current spec')
    declared_parts = [
        '01-entry-and-authority.md',
        '02-context-and-request.md',
        '03-decision-and-orchestration.md',
        '04-execution-and-effects.md',
        '05-evidence-and-delivery.md',
        '06-persistence-and-operations.md',
    ]
    part_files = sorted((ROOT / 'parts').glob('[0-9][0-9]-*.md'))
    if [p.name for p in part_files] != declared_parts:
        errors.append('Expected six MGRS architecture pages in declared order')
    if len(re.findall(r'^## 第[一二三四五六]部分 · ', index, re.M)) != 6:
        errors.append('Expected six top-level sections in MGRS.md')
    for number, filename in enumerate(declared_parts, 1):
        page = ROOT / 'parts' / filename
        if not page.is_file():
            continue
        anchor = f'id="part-{number}"'
        if anchor not in index or anchor not in page.read_text(encoding='utf-8'):
            errors.append('Missing six-part anchor: ' + anchor)
    allowlist = ROOT / 'publish-files.txt'
    if allowlist.exists():
        for name in allowlist.read_text().splitlines():
            if name and (not (ROOT / name).is_file() or (ROOT / name).is_symlink()):
                errors.append('Invalid publication file: ' + name)
    if errors:
        print('\n'.join('ERROR: ' + e for e in errors), file=sys.stderr)
        return 1
    print(f'PASS: {len(manifest["sources"])} original Git blobs; 6 parts; 16 chapters; '
          f'14 invariants; {len(pages)} Markdown files; {local_count} local links/anchors.')
    print('Document checks only. No product, provider, deployment or remote publication tests.')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main())
    except (OSError, ValueError, KeyError) as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        sys.exit(1)
