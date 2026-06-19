28th May '26, 01:15am

Status: #ProperNotes #Live

Tags: [[Portfolio]] [[Obsidian]] [[Publishing]]

# Obsidian Workflow

This site now renders notes directly from the copied Obsidian export in `obsidian-files`.

## Folder Roles

- `obsidian-files/2 - Full Notes` contains concrete notes that can appear on the website.
- `obsidian-files/3 - Source Material` is ignored for now.
- `obsidian-files/4 - Tags` helps connect notes inside Obsidian, but the tag files themselves are ignored.
- `obsidian-files/6 - Assets` contains images and other files used by notes.

Only top-level markdown files in `2 - Full Notes` are indexed right now. Subfolders are intentionally skipped.

## Note Format

Use this structure for notes that should render cleanly:

```md
14th May '26, 09:58pm

Status: #ProperNotes #Completed

Tags: [[JavaScript]] [[Web Dev]]

# Note Title

The actual note content starts here.
```

The website uses:

- The first line as the displayed date label.
- `Status:` hashtags as status labels.
- `Tags:` wikilinks as filter tags.
- The first `# Heading` as the note title.
- The first normal paragraph as the note preview.

## Rebuild the Website Index

Whenever notes change, run:

```bash
python scripts/build_obsidian_index.py
```

This writes:

```text
content/obsidian-notes-index.json
```

The browser reads that JSON file, then loads the selected markdown note when you click it.

## Supported Rendering

The current renderer supports:

- Headings
- Paragraphs
- Bullet lists
- Code blocks
- Inline code
- Bold and italic text
- Markdown links
- Obsidian wikilinks like `[[JavaScript]]`
- Obsidian images like `![[JavaScript-Engine-Diagram.webp]]`
- Basic markdown tables
- Blockquotes

Images are loaded from:

```text
obsidian-files/6 - Assets
```

## Publishing Rule

Before pushing public changes:

1. Review notes in `obsidian-files/2 - Full Notes`.
2. Remove private context or rough scratch notes.
3. Rebuild the notes index.
4. Open `blog.html` locally and click through a few notes.

This keeps the site useful while still letting Obsidian stay your working notebook.
