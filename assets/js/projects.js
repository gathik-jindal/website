/* Projects page: category filter, and keeping the last grid row full. */
(() => {
  const grid = document.querySelector("#projectGrid");
  if (!grid) return;

  const cards = [...grid.querySelectorAll(".project-card")];
  const gridEnd = document.querySelector("#gridEnd");
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const count = document.querySelector("#filterCount");
  const empty = document.querySelector("#filterEmpty");
  const filters = new Set(buttons.map((button) => button.dataset.filter));

  /* The grid lines are the ink showing through the gaps, so an empty
     cell at the end of the last row would show as a solid block.
     Stretch the filler card across whatever is left instead. */
  function fillLastRow() {
    if (!gridEnd) return;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const visible = cards.filter((card) => !card.hidden).length;
    const left = visible === 0 ? 0 : (columns - (visible % columns)) % columns;
    const span = left || columns;
    gridEnd.hidden = visible === 0;
    gridEnd.style.gridColumn = `span ${span}`;
  }

  function applyFilter(filter, { updateUrl = true } = {}) {
    if (!filters.has(filter)) filter = "all";

    let shown = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(" ");
      const match = filter === "all" || tags.includes(filter);
      card.hidden = !match;
      if (match) shown += 1;
    });

    buttons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (count) count.textContent = `${shown} of ${cards.length} shown`;
    if (empty) empty.hidden = shown > 0;
    fillLastRow();

    if (updateUrl) {
      const query = filter === "all" ? "" : `?filter=${encodeURIComponent(filter)}`;
      history.replaceState(null, "", window.location.pathname + query + window.location.hash);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter));
  });

  let frame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(fillLastRow);
  });

  const initial = new URLSearchParams(window.location.search).get("filter") || "all";
  applyFilter(initial, { updateUrl: false });
})();
