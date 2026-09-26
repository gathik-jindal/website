# Gathik Jindal Portfolio

A dependency-free portfolio and Obsidian-powered notes site. The design follows Codecademy's look: beige paper, navy ink, "hyper" blue and yellow accents, sharp grid borders, a hatched hover shadow, Inter for text and IBM Plex Mono for labels. It has a light and a dark theme, and the home page includes a live graph of the published notes.

## What This Repo Does

- Shows a portfolio homepage in `index.html`.
- Shows an Obsidian notes browser in `notes.html`.
- Reads concrete notes from `obsidian-files/2 - Full Notes`.
- Ignores source material and tag-only files for rendering.
- Loads note assets from `obsidian-files/6 - Assets`.
- Builds a browser-readable notes index at `content/obsidian-notes-index.json`.

## Project Structure

- `index.html` - portfolio homepage with the live note graph
- `projects.html` - project list
- `notes.html` - Obsidian notes browser
- `assets/css/base.css` - shared layout, tokens, and chrome
- `assets/css/pages/home.css` - portfolio homepage styles
- `assets/css/pages/notes.css` - notes browser styles
- `assets/css/pages/projects.css` - projects page styles
- `assets/css/styles.css` - compatibility entry point that imports the split stylesheets
- `assets/js/main.js` - theme toggle, page transitions, headline and panel reveals
- `assets/js/graph.js` - the interactive note graph on the homepage (reads the notes index)
- `assets/js/notes.js` - notes search, tag filtering, sidebar list, markdown rendering, and links between notes
- `scripts/build_obsidian_index.py` - scans Obsidian notes and creates the notes index
- `scripts/copy_obsidian.py` - optional helper for copying a vault/folder into this repo
- `obsidian-files/2 - Full Notes` - top-level concrete notes shown on the site
- `obsidian-files/3 - Source Material` - ignored by the site
- `obsidian-files/4 - Tags` - used conceptually for Obsidian, ignored by the site
- `obsidian-files/6 - Assets` - images/assets referenced by notes
- `obsidian-files/2 - Full Notes/Obsidian Workflow.md` - public workflow note linked from the homepage

## Run Locally

The notes page uses `fetch`, so use a local static server:

```bash
python -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173
```

If you use VS Code Live Server, the site may be at a different port, such as:

```text
http://127.0.0.1:5500
```

## Update Notes

After adding or editing markdown files in `obsidian-files/2 - Full Notes`, rebuild the notes index:

```bash
python scripts/build_obsidian_index.py
```

The script currently scans only top-level `.md` files in `2 - Full Notes`. Subfolders are ignored for now.

## Expected Note Format

The index builder expects notes shaped roughly like this:

```md
14th May '26, 09:58pm

Status: #ProperNotes #Completed

Tags: [[Data Structures and Algorithms]]

# Binary Heap

Note content starts here.
```

The first date line, `Status:`, and `Tags:` are used for filtering/display. The first `# Heading` becomes the note title.

Inside a note, `[[Other Note]]` becomes a clickable link when that note is also published (otherwise it shows as a plain pill), and Obsidian `==highlights==` render as highlighted text.

The notes page accepts `?tag=Topic` to open pre-filtered; the homepage graph uses this when a topic is clicked.

## Motion and accessibility

All animation is switched off for visitors who set "reduce motion" in their OS. The page curtain lifts on its own via CSS, so a JavaScript error can never leave the page covered.

## Copy Obsidian Files

You can copy an Obsidian folder into this repo with:

```bash
python scripts/copy_obsidian.py "C:\path\to\your\vault" --dest obsidian-files --overwrite
```

Use this carefully if `obsidian-files` already has changes, because `--overwrite` replaces the destination.

## Publishing

This is a static site, so it can be deployed on GitHub Pages.

1. Push this repository to GitHub.
2. Go to `Settings > Pages`.
3. Choose `Deploy from a branch`.
4. Select `main` and `/root`.

For a personal GitHub Pages site, name the repository:

```text
gathik-jindal.github.io
```
