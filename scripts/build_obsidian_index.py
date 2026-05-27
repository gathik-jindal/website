#!/usr/bin/env python3
"""Build a browser-readable index for top-level Obsidian notes."""

from __future__ import annotations

import json
import re
from pathlib import Path


NOTES_DIR = Path("obsidian-files/2 - Full Notes")
OUTPUT = Path("content/obsidian-notes-index.json")


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "note"


def extract_wikilinks(value: str) -> list[str]:
    return re.findall(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]", value)


def clean_preview_line(value: str) -> str:
    value = re.sub(r"!\[\[[^\]]+\]\]", "", value)
    value = re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", lambda m: m.group(2) or m.group(1), value)
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"[#*_`>~-]+", " ", value)
    return " ".join(value.split())


def parse_note(path: Path) -> dict[str, object]:
    text = path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    title = path.stem
    date_label = ""
    status: list[str] = []
    tags: list[str] = []

    if lines:
        date_label = lines[0].strip()

    for line in lines[:10]:
        if line.startswith("Status:"):
            status = [item.lstrip("#") for item in re.findall(r"#([\w-]+)", line)]
        if line.startswith("Tags:"):
            tags = extract_wikilinks(line)

    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
            break

    description = ""
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped == date_label or stripped.startswith(("Status:", "Tags:", "#", "```", "|", "-", ">")):
            continue
        description = clean_preview_line(stripped)
        if description:
            break

    if not description:
        description = "A public note from my Obsidian vault."

    return {
        "slug": slugify(path.stem),
        "title": title,
        "description": description[:180],
        "dateLabel": date_label,
        "tags": tags,
        "status": status,
        "file": str(path.as_posix()),
    }


def main() -> None:
    if not NOTES_DIR.exists():
        raise FileNotFoundError(f"Missing notes directory: {NOTES_DIR}")

    notes = [parse_note(path) for path in sorted(NOTES_DIR.glob("*.md"), key=lambda item: item.stem.lower())]
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(notes, indent=2), encoding="utf-8")
    print(f"Wrote {len(notes)} notes to {OUTPUT}")


if __name__ == "__main__":
    main()
