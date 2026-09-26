/* Shared behaviour for every page: theme switching, page transitions,
   and headline and panel reveals. */
(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- theme */
  const themeToggle = document.querySelector("#themeToggle");

  function syncThemeLabel() {
    if (!themeToggle) return;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
  }

  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable (private mode); the switch still works */
    }
    syncThemeLabel();
    window.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  });
  syncThemeLabel();

  /* ------------------------------------------------------ page transitions */
  const curtain = document.querySelector(".page-curtain");

  function navigate(url) {
    if (!curtain || reduceMotion) {
      window.location.href = url;
      return;
    }
    curtain.classList.add("is-entering");
    window.setTimeout(() => {
      window.location.href = url;
    }, 380);
  }
  window.siteNavigate = navigate;

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");

    // In-page anchors: smooth scroll instead of a page transition.
    if (href.startsWith("#")) {
      if (href === "#") return;
      let id = href.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        /* leave malformed ids as they are */
      }
      const target = document.getElementById(id);
      if (!target) return; // e.g. note links on the notes page, handled by notes.js
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      return;
    }

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.protocol === "mailto:") return;
    if (url.pathname === window.location.pathname && url.hash) return;

    event.preventDefault();
    navigate(url.href);
  });

  // Coming back via the browser's back button restores the page from cache
  // with the curtain still down, so lift it again.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) curtain?.classList.remove("is-entering");
  });

  /* ------------------------------------------------------ split headlines */
  function splitWords(element) {
    const text = element.textContent.trim().replace(/\s+/g, " ");
    element.setAttribute("aria-label", text);
    element.innerHTML = text
      .split(" ")
      .map((word, index) => {
        const safe = word.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        return `<span class="word" aria-hidden="true"><span class="word-inner" style="--i:${index}">${safe}</span></span>`;
      })
      .join(" ");
  }

  document.querySelectorAll("[data-split]").forEach(splitWords);

  /* ------------------------------------------------------ scroll reveals */
  function countUp(element) {
    const target = Number(element.dataset.count) || 0;
    if (reduceMotion) {
      element.textContent = `${target}%`;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      element.textContent = `${Math.round(target * eased)}%`;
      if (t < 1) requestAnimationFrame(frame);
    }
    element.textContent = "0%";
    requestAnimationFrame(frame);
  }

  const revealTargets = document.querySelectorAll("[data-split], [data-reveal], [data-progress], [data-count]");

  function reveal(element) {
    element.classList.add("is-in");
    if (element.hasAttribute("data-count")) countUp(element);
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(reveal);
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
    );
    revealTargets.forEach((element) => observer.observe(element));
  }
})();
