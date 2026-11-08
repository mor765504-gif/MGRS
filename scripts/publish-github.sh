#!/usr/bin/env bash
# Explicit, private-only first publication. No source-repository history is copied.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OWNER="mor765504-gif"
NAME="MGRS"
TARGET="$OWNER/$NAME"
export GH_HOST="github.com"

if [[ "${1:-}" == "--check" ]]; then
  exec python3 "$ROOT/scripts/verify_archive.py"
fi
if [[ "${1:-}" != "--create" || "$#" -ne 1 ]]; then
  printf 'Usage: bash scripts/publish-github.sh --check | --create\n' >&2
  exit 2
fi
for tool in git gh python3; do
  command -v "$tool" >/dev/null 2>&1 || { printf 'Missing dependency: %s\n' "$tool" >&2; exit 1; }
done
python3 "$ROOT/scripts/verify_archive.py"
# Do not alter any existing Git checkout, including a parent checkout.
if git -C "$ROOT" rev-parse --show-toplevel >/dev/null 2>&1; then
  printf 'Refusing to initialize inside an existing Git repository. Extract a fresh copy.\n' >&2
  exit 1
fi
gh auth status --hostname github.com >/dev/null
LOGIN="$(gh api user --jq '.login')"
if [[ "$LOGIN" != "$OWNER" ]]; then
  printf 'Expected GitHub account %s, got %s. No repository created.\n' "$OWNER" "$LOGIN" >&2
  exit 1
fi
if gh repo view "$TARGET" --json nameWithOwner >/dev/null 2>&1; then
  printf 'Repository %s already exists. Refusing to overwrite or push to it.\n' "$TARGET" >&2
  exit 1
fi
USER_ID="$(gh api user --jq '.id')"
[[ "$USER_ID" =~ ^[0-9]+$ ]] || { printf 'Invalid GitHub user ID.\n' >&2; exit 1; }
# Publication contains ONLY enumerated text files. Validate the complete list first.
while IFS= read -r p || [[ -n "$p" ]]; do
  [[ -n "$p" ]] || continue
  case "$p" in /*|*..*|.git/*) printf 'Unsafe publication path: %s\n' "$p" >&2; exit 1;; esac
  [[ -f "$ROOT/$p" && ! -L "$ROOT/$p" ]] || { printf 'Invalid file: %s\n' "$p" >&2; exit 1; }
done < "$ROOT/publish-files.txt"

git -c init.templateDir= -C "$ROOT" init -b main
git -C "$ROOT" config user.name "$LOGIN"
git -C "$ROOT" config user.email "${USER_ID}+${LOGIN}@users.noreply.github.com"
git -C "$ROOT" config core.hooksPath /dev/null
while IFS= read -r p || [[ -n "$p" ]]; do
  [[ -n "$p" ]] || continue
  git -C "$ROOT" add -- "$p"
done < "$ROOT/publish-files.txt"
git -c commit.gpgsign=false -C "$ROOT" commit -m 'docs: archive MGRS 0.1 specification, research and discussion records'

if ! gh repo create "$TARGET" --private --disable-wiki \
  --description 'MGRS: Mimi proprietary Agent governance protocol, specification and review archive' \
  --source "$ROOT" --remote origin; then
  printf 'Creation failed or was not confirmed. Local commit is retained; inspect GitHub before retrying.\n' >&2
  exit 1
fi
PRIVATE="$(gh api "repos/$TARGET" --jq '.private')"
[[ "$PRIVATE" == true ]] || { printf 'Private visibility not confirmed. Refusing to push.\n' >&2; exit 1; }
# Use gh's credential helper for this push only, without writing global Git settings.
if ! git -c credential.helper= -c 'credential.helper=!gh auth git-credential' -C "$ROOT" push -u origin HEAD:main; then
  printf 'Repository creation was confirmed, but push was not confirmed. Local commit and remote are retained.\n' >&2
  printf 'Read docs/PUBLISH.md before recovery. Do not recreate the repository blindly.\n' >&2
  exit 1
fi
LOCAL="$(git -C "$ROOT" rev-parse HEAD)"
REMOTE="$(gh api "repos/$TARGET/git/ref/heads/main" --jq '.object.sha')"
[[ "$LOCAL" == "$REMOTE" ]] || { printf 'Remote commit verification failed.\n' >&2; exit 1; }
printf 'Published private repository at commit %s\n' "$REMOTE"
gh api "repos/$TARGET" --jq '.html_url'
