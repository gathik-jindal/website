/* About page: hovering a category tag highlights its tools in the cloud,
   and hovering a tool lights up its category. Click a tag to keep the
   highlight on (the only way to use it on touch screens). */
(() => {
  const cloud = document.querySelector("#toolCloud");
  if (!cloud) return;

  const cats = [...document.querySelectorAll(".tool-cat")];
  const tools = [...cloud.querySelectorAll(".tool")];
  let locked = null;

  function highlight(cat) {
    cloud.classList.toggle("is-filtering", Boolean(cat));
    tools.forEach((tool) => {
      tool.classList.toggle("is-match", Boolean(cat) && tool.dataset.cat === cat);
    });
    cats.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.cat === cat);
    });
  }

  cats.forEach((button) => {
    const cat = button.dataset.cat;
    button.addEventListener("mouseenter", () => highlight(cat));
    button.addEventListener("focus", () => highlight(cat));
    button.addEventListener("mouseleave", () => highlight(locked));
    button.addEventListener("blur", () => highlight(locked));
    button.addEventListener("click", () => {
      locked = locked === cat ? null : cat;
      cats.forEach((other) => other.setAttribute("aria-pressed", String(other.dataset.cat === locked)));
      highlight(locked);
    });
  });

  tools.forEach((tool) => {
    tool.addEventListener("mouseenter", () => {
      if (locked) return;
      cats.forEach((button) => button.classList.toggle("is-related", button.dataset.cat === tool.dataset.cat));
    });
    tool.addEventListener("mouseleave", () => {
      cats.forEach((button) => button.classList.remove("is-related"));
    });
  });
})();
