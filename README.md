# Gathik Jindal Portfolio

A dependency-free portfolio and Obsidian-powered notes site. The design follows Codecademy's look: beige paper, navy ink, "hyper" blue and yellow accents, sharp grid borders, a hatched hover shadow, Inter for text and IBM Plex Mono for labels. It opens in light mode; visitors can switch to dark with the toggle, and that choice is remembered. The home page includes a live graph of the published notes.

## What This Repo Does

- Shows a portfolio homepage in `index.html`.
- Shows an Obsidian notes browser in `notes.html`.
- Reads concrete notes from `obsidian-files/2 - Full Notes`.
- Ignores source material and tag-only files for rendering.
- Loads note assets from `obsidian-files/6 - Assets`.
- Builds a browser-readable notes index at `content/obsidian-notes-index.json`.

## Project Structure

- `index.html` - portfolio homepage with the live note graph
- `projects.html` - projects: a featured paper, then a filterable card grid
- `about.html` - about and contact: bio, how I work, tools stack, principles, milestones, and contact links (`about#contact`)
- `notes.html` - Obsidian notes browser
- `assets/css/base.css` - shared layout, tokens, and chrome
- `assets/css/pages/home.css` - portfolio homepage styles
- `assets/css/pages/notes.css` - notes browser styles
- `assets/css/pages/projects.css` - projects page styles
- `assets/css/pages/about.css` - about page styles
- `assets/css/styles.css` - compatibility entry point that imports the split stylesheets
- `assets/js/main.js` - theme toggle, page transitions, headline and panel reveals
- `assets/js/graph.js` - the interactive note graph on the homepage (reads the notes index)
- `assets/js/notes.js` - notes search, tag filtering, sidebar list, markdown rendering, and links between notes
- `assets/js/projects.js` - project category filter (`?filter=research`) and last-row filling for the grid
- `assets/images/projects/` - project screenshots and diagrams, taken from each project's README
- `scripts/build_obsidian_index.py` - scans Obsidian notes and creates the notes index
- `scripts/copy_obsidian.py` - optional helper for copying a vault/folder into this repo
- `scripts/serve.py` - local server that resolves extensionless links like GitHub Pages
- `obsidian-files/2 - Full Notes` - top-level concrete notes shown on the site
- `obsidian-files/3 - Source Material` - ignored by the site
- `obsidian-files/4 - Tags` - used conceptually for Obsidian, ignored by the site
- `obsidian-files/6 - Assets` - images/assets referenced by notes
- `obsidian-files/2 - Full Notes/Obsidian Workflow.md` - public workflow note linked from the homepage

## Run Locally

Pages link to each other without the `.html` extension (`projects`, `notes`), which GitHub Pages resolves on its own. Python's plain `http.server` does not, so use the bundled server, which adds that one fallback:

```bash
python scripts/serve.py
```

Open:

```text
http://127.0.0.1:4173
```

VS Code Live Server and `python -m http.server` also work, but clicking between pages there gives a 404 because they do not resolve extensionless links. Open `projects.html`, `notes.html`, or `about.html` directly if you use them.

## Add a Project

Copy one `<article class="project-card">` block in `projects.html` and put it in date order (the grid runs newest first, so new work goes at the top). Set `data-tags` to one or more of `research`, `systems`, `web`, `games` so the filter picks it up, and bump the project count in the stats strip. For the media strip, either drop a 16:9-ish image into `assets/images/projects/` (WebP, about 1200px wide) or use a typographic `project-cover` with a headline number. The filler card at the end of the grid resizes itself, so any number of cards works.

## Contact and the shared chrome

Contact details live in one place, the `#contact` section at the bottom of `about.html`. Every page's nav "About" link, "Hire me" button, and slim footer ("Contact me") point there, so an email or profile change only needs editing in `about.html`. The scrolling focus strip is repeated on the home, projects, and about pages; keep its items the same on all three.

## Tools stack

The tools on the About page are `<li class="tool" data-cat="...">` tags in one mixed list. `data-cat` is one of `lang`, `ml`, `data`, `infra`, `web`, `flow`, matching the category buttons above it; hovering or clicking a button highlights its tools (`assets/js/about.js`). Icons are monochrome SVGs in `assets/images/tools/`, mostly from [Simple Icons](https://simpleicons.org) (CC0), applied as masks so they follow the theme. If you add a tool to a category, update that button's count too.

## After changing CSS or JS

Every page loads its stylesheets and scripts with a version query, such as `base.css?v=5`. Browsers and GitHub Pages cache these files, so bump the number in all four HTML files whenever you change a `.css` or `.js` file, or visitors may keep seeing the old styles.

## Update Notes

After adding or editing markdown files in `obsidian-files/2 - Full Notes`, rebuild the notes index:

```bash
python scripts/build_obsidian_index.py
```

The notes page and the homepage graph both read this index, so refresh the page after rebuilding and they update. Both scripts work from any folder (repo root or `scripts/`).

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

After copying, the script rebuilds `content/obsidian-notes-index.json` automatically, so one command updates the notes page and the homepage graph. Add `--no-index` to skip that step.

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
