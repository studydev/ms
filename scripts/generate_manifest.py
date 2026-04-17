#!/usr/bin/env python3
"""Scan docs/ for documents under each category and regenerate docs/manifest.json.

Structure expected:
    docs/<category>/<slug>/index.html

Title/description are extracted from the <title> tag and first <p class="lead"> or
<meta name="description">.
"""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
MANIFEST = DOCS / "manifest.json"

CATEGORIES = {
    "azure":  {"label": "Azure",         "description": "Azure Foundry, AI Agent, Cosmos DB, App Service 등 Azure 전반."},
    "m365":   {"label": "Microsoft 365", "description": "Copilot, Graph API, Teams, SharePoint 등."},
    "github": {"label": "GitHub",        "description": "GitHub Actions, Copilot, Codespaces 등."},
}

TITLE_RE = re.compile(r"<title>(.*?)</title>", re.IGNORECASE | re.DOTALL)
DESC_META_RE = re.compile(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', re.IGNORECASE)
LEAD_RE = re.compile(r'<p[^>]*class=["\'][^"\']*\blead\b[^"\']*["\'][^>]*>(.*?)</p>', re.IGNORECASE | re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")


def extract_meta(html: str) -> tuple[str, str]:
    title = ""
    desc = ""
    m = TITLE_RE.search(html)
    if m:
        title = TAG_RE.sub("", m.group(1)).strip()
    m = DESC_META_RE.search(html)
    if m:
        desc = m.group(1).strip()
    if not desc:
        m = LEAD_RE.search(html)
        if m:
            desc = TAG_RE.sub("", m.group(1)).strip()
            desc = re.sub(r"\s+", " ", desc)
            if len(desc) > 160:
                desc = desc[:157].rstrip() + "…"
    return title, desc


def scan_category(cat: str) -> list[dict]:
    cat_dir = DOCS / cat
    if not cat_dir.is_dir():
        return []
    docs: list[dict] = []
    for child in sorted(cat_dir.iterdir()):
        if not child.is_dir():
            continue
        index_html = child / "index.html"
        if not index_html.is_file():
            continue
        html = index_html.read_text(encoding="utf-8", errors="ignore")
        title, desc = extract_meta(html)
        docs.append({
            "slug": child.name,
            "title": title or child.name,
            "description": desc,
            "path": f"{cat}/{child.name}/",
        })
    return docs


def main() -> None:
    manifest = {
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "categories": {},
    }
    for cat, meta in CATEGORIES.items():
        manifest["categories"][cat] = {
            "label": meta["label"],
            "description": meta["description"],
            "docs": scan_category(cat),
        }
    MANIFEST.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=4) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
