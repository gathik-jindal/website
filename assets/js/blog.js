const postGrid = document.querySelector("#postGrid");
const tagList = document.querySelector("#tagList");
const reader = document.querySelector("#reader");
const readerContent = document.querySelector("#readerContent");
const readerClose = document.querySelector("#readerClose");

let posts = [];
let activeTag = "all";

async function loadPosts() {
  try {
    const response = await fetch("content/posts-index.json");
    posts = await response.json();
    renderTags();
    renderPosts();
  } catch {
    postGrid.innerHTML = '<p class="reader">Posts need a local server. Run <code>python -m http.server 4173</code>.</p>';
  }
}

function renderTags() {
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  tagList.innerHTML = [
    '<button class="tag is-active" type="button" data-tag="all">All</button>',
    ...tags.map((tag) => `<button class="tag" type="button" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`),
  ].join("");
}

function renderPosts() {
  const visible = activeTag === "all" ? posts : posts.filter((post) => post.tags.includes(activeTag));
  postGrid.innerHTML = visible
    .map((post) => `
      <button class="post-card" type="button" data-slug="${escapeHtml(post.slug)}">
        <span>
          <h2>${escapeHtml(post.title)}</h2>
          <p>${escapeHtml(post.description)}</p>
        </span>
        <span class="post-meta">${formatDate(post.date)}</span>
      </button>
    `)
    .join("");
}

async function openPost(slug) {
  const post = posts.find((item) => item.slug === slug);
  if (!post) return;

  const response = await fetch(`content/posts/${post.file}`);
  const markdown = await response.text();
  readerContent.innerHTML = markdownToHtml(markdown.replace(/^---[\s\S]*?---\s*/, ""));
  reader.hidden = false;
  reader.scrollIntoView({ behavior: "smooth", block: "start" });
}

function markdownToHtml(markdown) {
  const html = [];
  let listOpen = false;
  let codeOpen = false;
  let code = [];

  markdown.split(/\r?\n/).forEach((line) => {
    if (line.startsWith("```")) {
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

    if (line.startsWith("- ")) {
      if (!listOpen) html.push("<ul>");
      listOpen = true;
      html.push(`<li>${inline(line.slice(2))}</li>`);
      return;
    }

    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }

    if (line.startsWith("# ")) html.push(`<h1>${inline(line.slice(2))}</h1>`);
    else if (line.startsWith("## ")) html.push(`<h2>${inline(line.slice(3))}</h2>`);
    else if (line.trim()) html.push(`<p>${inline(line)}</p>`);
  });

  if (listOpen) html.push("</ul>");
  return html.join("");
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
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
  renderPosts();
});

postGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-slug]");
  if (card) openPost(card.dataset.slug);
});

readerClose.addEventListener("click", () => {
  reader.hidden = true;
});

loadPosts();
