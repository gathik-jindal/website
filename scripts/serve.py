#!/usr/bin/env python3
"""Serve the site locally the way GitHub Pages does.

GitHub Pages answers `/projects` with `projects.html`, so the site links
to pages without the extension. Python's built-in server does not, so this
adds that one fallback on top of it.

    python scripts/serve.py          # http://127.0.0.1:4173
    python scripts/serve.py 8000
"""

from __future__ import annotations

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit


# Resolve paths from the repo root so the script works from any folder.
REPO_ROOT = Path(__file__).resolve().parents[1]


class PagesHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        parts = urlsplit(self.path)
        local = Path(self.translate_path(parts.path))
        # "/notes" -> "/notes.html" when there is no file or folder by that name
        if not local.exists() and local.with_suffix(".html").is_file():
            self.path = urlunsplit(parts._replace(path=parts.path + ".html"))
        return super().send_head()


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    handler = partial(PagesHandler, directory=str(REPO_ROOT))
    with ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
        print(f"Serving {REPO_ROOT} at http://127.0.0.1:{port}")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
