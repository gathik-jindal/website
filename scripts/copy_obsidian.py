#!/usr/bin/env python3
"""Copy an Obsidian folder into this repository for local use."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


DEFAULT_EXCLUDES = {
    ".git",
    ".obsidian",
    ".trash",
    ".DS_Store",
    "Thumbs.db",
    "1 - Rough Notes",
    "5 - Templates"
}


def should_ignore(path: Path, extra_excludes: set[str]) -> bool:
    names = set(path.parts)
    return bool(names & (DEFAULT_EXCLUDES | extra_excludes))


def copy_tree(source: Path, destination: Path, extra_excludes: set[str], overwrite: bool) -> None:
    if not source.exists():
        raise FileNotFoundError(f"Source does not exist: {source}")
    if not source.is_dir():
        raise NotADirectoryError(f"Source must be a directory: {source}")

    if destination.exists():
        if not overwrite:
            raise FileExistsError(
                f"Destination already exists: {destination}\n"
                "Use --overwrite to replace it."
            )
        shutil.rmtree(destination)

    destination.mkdir(parents=True, exist_ok=True)

    for item in source.rglob("*"):
        relative = item.relative_to(source)
        if should_ignore(relative, extra_excludes):
            continue

        target = destination / relative
        if item.is_dir():
            target.mkdir(parents=True, exist_ok=True)
            continue

        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(item, target)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Copy an Obsidian directory into a local ignored folder in this website repo."
    )
    parser.add_argument(
        "source", help="Path to your Obsidian vault or notes folder.")
    parser.add_argument(
        "--dest",
        default="private/obsidian",
        help="Destination inside this repo. Default: private/obsidian",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Replace the destination folder if it already exists.",
    )
    parser.add_argument(
        "--exclude",
        action="append",
        default=[],
        help="Additional file or folder name to exclude. Can be used more than once.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[1]
    source = Path(args.source).expanduser().resolve()
    destination = (repo_root / args.dest).resolve()

    if repo_root not in destination.parents and destination != repo_root:
        raise ValueError(
            f"Destination must stay inside this repo: {repo_root}")

    copy_tree(source, destination, set(args.exclude), args.overwrite)
    print(f"Copied Obsidian files from:\n  {source}\nto:\n  {destination}")


if __name__ == "__main__":
    main()
