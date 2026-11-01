#!/usr/bin/env bash
# Ensure CMS uploads persist OUTSIDE the deploy folder and are symlinked into public/.
#
# Persistent storage: ../uploads-data (sibling of nodejs/ app root) — never wiped by deploy zip.
# Usage (from app root, e.g. ~/domains/deepamtextile.com/nodejs):
#   bash scripts/setup-hostinger-uploads.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
# shellcheck source=scripts/lib/hostinger-paths.sh
source "$ROOT/scripts/lib/hostinger-paths.sh"

DOMAIN_DIR="$(hostinger_domain_dir "$ROOT")"
PERSISTENT="$(hostinger_persistent_uploads "$ROOT")"
STANDALONE_PUBLIC="$(hostinger_public_dir "$ROOT")"

echo "→ setup-hostinger-uploads: app root $ROOT"
echo "→ setup-hostinger-uploads: public dir $STANDALONE_PUBLIC"

LEGACY_UPLOADS="$ROOT/public/uploads"
TARGET_LINK="$STANDALONE_PUBLIC/uploads"

mkdir -p "$PERSISTENT"
echo "→ Persistent uploads dir: $PERSISTENT"

merge_into_persistent() {
  local src="$1"
  [[ -d "$src" ]] || return 0
  [[ -L "$src" ]] && return 0
  [[ -n "$(ls -A "$src" 2>/dev/null || true)" ]] || return 0
  echo "→ Merging $src → $PERSISTENT"
  cp -an "$src/." "$PERSISTENT/" 2>/dev/null || cp -a "$src/." "$PERSISTENT/"
}

# Collect uploads from any legacy location into persistent storage (idempotent).
merge_into_persistent "$PERSISTENT"
merge_into_persistent "$TARGET_LINK"
merge_into_persistent "$LEGACY_UPLOADS"
merge_into_persistent "$ROOT/nodejs/public/uploads"
merge_into_persistent "$ROOT/.next/standalone/public/uploads"

# Replace deploy-dir uploads with symlink to persistent storage.
for link in "$TARGET_LINK" "$LEGACY_UPLOADS"; do
  [[ -z "$link" ]] && continue
  if [[ -e "$link" ]] && [[ ! -L "$link" ]]; then
    echo "→ Replacing real directory $link with symlink"
    rm -rf "$link"
  fi

  if [[ ! -L "$link" ]]; then
    mkdir -p "$(dirname "$link")"
    ln -sfn "$PERSISTENT" "$link"
    echo "→ Symlink: $link → $PERSISTENT"
  else
    current="$(readlink -f "$link" 2>/dev/null || readlink "$link" || true)"
    if [[ "$current" != "$PERSISTENT" ]]; then
      rm -f "$link"
      ln -sfn "$PERSISTENT" "$link"
      echo "→ Updated symlink: $link → $PERSISTENT"
    else
      echo "→ Symlink OK: $link → $PERSISTENT"
    fi
  fi
done

FILE_COUNT="$(hostinger_count_upload_files "$PERSISTENT")"
echo "→ Persistent uploads: $FILE_COUNT files in $PERSISTENT"

# Hostinger: symlink public_html/uploads so Apache can serve CMS files before Node proxy.
PUBLIC_HTML="${PUBLIC_HTML:-}"
if [[ -z "$PUBLIC_HTML" ]]; then
  if [[ -d "$DOMAIN_DIR/public_html" ]]; then
    PUBLIC_HTML="$DOMAIN_DIR/public_html"
  elif [[ -d "$HOME/public_html" ]]; then
    PUBLIC_HTML="$HOME/public_html"
  elif [[ -d "$HOME/domains" ]]; then
    PUBLIC_HTML="$(find "$HOME/domains" -maxdepth 2 -type d -name public_html 2>/dev/null | head -1 || true)"
  fi
fi

if [[ -n "$PUBLIC_HTML" ]] && [[ -d "$PUBLIC_HTML" ]]; then
  UPLOADS_LINK="$PUBLIC_HTML/uploads"
  mkdir -p "$PUBLIC_HTML"
  if [[ -L "$UPLOADS_LINK" ]] || [[ -e "$UPLOADS_LINK" ]]; then
    rm -rf "$UPLOADS_LINK"
  fi
  ln -sfn "$PERSISTENT" "$UPLOADS_LINK"
  echo "→ Symlink: $UPLOADS_LINK → $PERSISTENT"
else
  echo "WARN: public_html not found — skip uploads symlink (Node still serves /uploads/* if symlink exists in public/)" >&2
fi

if [[ "$FILE_COUNT" -eq 0 ]]; then
  echo ""
  echo "WARN: No upload files on disk. CMS images in the database will 404 until you:" >&2
  echo "  1. Re-upload in Admin → Pages / Settings / Products and click Save, or" >&2
  echo "  2. Restore a backup into $PERSISTENT" >&2
fi
