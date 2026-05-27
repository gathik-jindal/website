const postGrid = document.querySelector("#postGrid");
const tagList = document.querySelector("#tagList");
const reader = document.querySelector("#reader");
const readerContent = document.querySelector("#readerContent");
const readerClose = document.querySelector("#readerClose");
const sidebarNoteList = document.querySelector("#sidebarNoteList");
const noteSearch = document.querySelector("#noteSearch");
const tagToggle = document.querySelector("#tagToggle");
const ASSET_DIR = "obsidian-files/6 - Assets/";

let posts = [];
let activeTag = "all";
let searchTerm = "";
let tagsExpanded = false;

async function loadPosts() {
  try {
    const response = await fetch("content/obsidian-notes-index.json");
    posts = await response.json();
    renderTags();
    renderPosts();
    renderSidebarNotes();
    openPostFromHash();
  } catch {
    postGrid.innerHTML = '<p class="reader">Notes need an index. Run <code>python scripts/build_obsidian_index.py</code>, then serve the site locally.</p>';
  }
}

function renderTags() {
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  tagList.innerHTML = [
    '<button class="tag hover-pop is-active" type="button" data-tag="all">All</button>',
    ...tags.map((tag) => `<button class="tag hover-pop" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`),
  ].join("");
  tagList.classList.toggle("is-collapsed", !tagsExpanded);
}

function renderPosts() {
  const visible = getVisiblePosts();
  postGrid.innerHTML = visible
    .map((post) => `
      <button class="post-card hover-pop" type="button" data-slug="${escapeHtml(post.slug)}">
        <span>
          <h2>${escapeHtml(post.title)}</h2>
          <p>${escapeHtml(post.description)}</p>
        </span>
        <span class="post-meta">${escapeHtml(post.dateLabel || "")}</span>
      </button>
    `)
    .join("") || '<p class="reader">No notes match that filter.</p>';
}

function renderSidebarNotes() {
  const visible = getVisiblePosts();
  sidebarNoteList.innerHTML = visible
    .map((post) => `
      <button class="sidebar-note hover-pop" type="button" data-slug="${escapeHtml(post.slug)}">
        <span>${escapeHtml(post.title)}</span>
        <small>${escapeHtml(post.tags?.[0] || "Note")}</small>
      </button>
    `)
    .join("") || '<p class="sidebar-empty">No matching notes.</p>';
}

function getVisiblePosts() {
  return posts.filter((post) => {
    const matchesTag = activeTag === "all" || post.tags.includes(activeTag);
    const haystack = [post.title, post.description, post.dateLabel, ...(post.tags || []), ...(post.status || [])]
      .join(" ")
      .toLowerCase();
    return matchesTag && haystack.includes(searchTerm);
  });
}

async function openPost(slug, updateHash = true) {
  const post = posts.find((item) => item.slug === slug);
  if (!post) return;

  const response = await fetch(encodeURI(post.file));
  const markdown = await response.text();
  readerContent.innerHTML = renderNoteHeader(post) + markdownToHtml(stripNoteMetadata(markdown));
  reader.hidden = false;
  postGrid.hidden = true;
  highlightActiveNote(slug);
  if (updateHash && window.location.hash !== `#${slug}`) {
    history.replaceState(null, "", `#${slug}`);
  }
  reader.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openPostFromHash() {
  const slug = decodeURIComponent(window.location.hash.replace("#", ""));
  if (slug) openPost(slug, false);
}

function highlightActiveNote(slug) {
  document.querySelectorAll("[data-slug]").forEach((item) => {
    item.classList.toggle("is-selected", item.dataset.slug === slug);
  });
}

function renderNoteHeader(post) {
  const tags = post.tags?.length
    ? `<div class="reader-tags">${post.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`
    : "";
  const status = post.status?.length ? `<p class="reader-status">${post.status.map(escapeHtml).join(" / ")}</p>` : "";

  return `
    <header class="reader-note-head">
      <p class="panel-label">${escapeHtml(post.dateLabel || "Obsidian note")}</p>
      ${status}
      ${tags}
    </header>
  `;
}

function stripNoteMetadata(markdown) {
  return markdown
    .replace(/^---[\s\S]*?---\s*/, "")
    .split(/\r?\n/)
    .filter((line, index) => {
      if (index === 0 && /\d{1,2}(st|nd|rd|th)\s+\w+/.test(line)) return false;
      return !line.startsWith("Status:") && !line.startsWith("Tags:");
    })
    .join("\n")
    .trim();
}

function markdownToHtml(markdown) {
  const html = [];
  let listOpen = false;
  let codeOpen = false;
  let code = [];
  let tableLines = [];

  function closeList() {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  }

  function closeTable() {
    if (!tableLines.length) return;
    html.push(tableToHtml(tableLines));
    tableLines = [];
  }

  markdown.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("```")) {
      closeList();
      closeTable();
      if (codeOpen) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
      }
      codeOpen = !codeOpen;
      return;
    }

    if (codeOpen) {
      code.push(line);
      return;
    }

    if (line.trim().startsWith("|")) {
      closeList();
      tableLines.push(line);
      return;
    }

    closeTable();

    if (line.startsWith("- ")) {
      if (!listOpen) html.push("<ul>");
      listOpen = true;
      html.push(`<li>${inline(line.slice(2))}</li>`);
      return;
    }

    closeList();

    if (line.startsWith("# ")) html.push(`<h1>${inline(line.slice(2))}</h1>`);
    else if (line.startsWith("## ")) html.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.startsWith("### ")) html.push(`<h3>${inline(line.slice(4))}</h3>`);
    else if (line.startsWith("#### ")) html.push(`<h4>${inline(line.slice(5))}</h4>`);
    else if (line.startsWith("> ")) html.push(`<blockquote>${inline(line.slice(2))}</blockquote>`);
    else if (line.trim()) html.push(`<p>${inline(line)}</p>`);
  });

  closeList();
  closeTable();
  return html.join("");
}

function tableToHtml(lines) {
  const rows = lines
    .filter((line) => !/^\|\s*-+/.test(line))
    .map((line) => line.split("|").slice(1, -1).map((cell) => inline(cell.trim())));

  if (!rows.length) return "";
  const [head, ...body] = rows;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>
        <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function inline(value) {
  return escapeHtml(value)
    .replace(/!\[\[([^\]]+)\]\]/g, (_, asset) => `<img class="note-image" src="${encodeURI(ASSET_DIR + asset)}" alt="">`)
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<span class="wiki-link">$2</span>')
    .replace(/\[\[([^\]]+)\]\]/g, '<span class="wiki-link">$1</span>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*\*\*(.*?)\*\*\*\*/g, "<strong>$1</strong>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

tagList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tag]");
  if (!button) return;
  activeTag = button.dataset.tag;
  tagList.querySelectorAll(".tag").forEach((tag) => tag.classList.toggle("is-active", tag === button));
  reader.hidden = true;
  postGrid.hidden = false;
  renderPosts();
  renderSidebarNotes();
});

postGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-slug]");
  if (card) openPost(card.dataset.slug);
});

sidebarNoteList.addEventListener("click", (event) => {
  const note = event.target.closest("[data-slug]");
  if (note) openPost(note.dataset.slug);
});

noteSearch.addEventListener("input", () => {
  searchTerm = noteSearch.value.trim().toLowerCase();
  reader.hidden = true;
  postGrid.hidden = false;
  renderPosts();
  renderSidebarNotes();
});

tagToggle.addEventListener("click", () => {
  tagsExpanded = !tagsExpanded;
  tagList.classList.toggle("is-collapsed", !tagsExpanded);
  tagToggle.textContent = tagsExpanded ? "Show less" : "Show more";
});

readerClose.addEventListener("click", () => {
  reader.hidden = true;
  postGrid.hidden = false;
  highlightActiveNote("");
  history.replaceState(null, "", window.location.pathname);
});

window.addEventListener("hashchange", openPostFromHash);

loadPosts();
