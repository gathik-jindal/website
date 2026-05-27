# Gathik Jindal Portfolio

A dependency-free portfolio and blog starter inspired by the compact Codecademy dashboard style from the reference image: warm paper background, sharp grid borders, dashboard navigation, and dense content panels.

## Structure

- `index.html` - portfolio dashboard homepage
- `blog.html` - public writing page
- `assets/css/styles.css` - full responsive design
- `assets/js/main.js` - smooth in-page navigation
- `assets/js/blog.js` - markdown post loading and tag filters
- `content/posts` - public markdown posts copied from Obsidian when ready
- `docs/obsidian-workflow.md` - suggested private-to-public notes workflow

## Run Locally

The blog loads markdown with `fetch`, so run a static server:

```bash
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

## Add a Post

1. Add a markdown file to `content/posts`.
2. Add a matching entry to `content/posts-index.json`.
3. Keep your private Obsidian vault out of this repository.

## Copy Obsidian Notes Locally

To copy your private Obsidian folder into an ignored local directory:

```bash
python scripts/copy_obsidian.py "C:\path\to\your\vault" --overwrite
```

By default, files are copied into `private/obsidian`, which is ignored by git.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. Go to `Settings > Pages`.
3. Choose `Deploy from a branch`.
4. Select `main` and `/root`.

For a personal site, name the repository:

```text
gathik-jindal.github.io
```
