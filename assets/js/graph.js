/* Home page hero: a live, Obsidian-style graph of the published notes.
   Topics (tags) are the large blue nodes, notes are the small ink dots.
   Hover traces a topic, click opens it on the notes page, drag rearranges. */
(() => {
  const canvas = document.querySelector("#noteGraph");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const caption = document.querySelector("#graphCaption");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const INDEX_URL = "content/obsidian-notes-index.json";
  const LABELLED_TOPICS = 7;
  const FONT = '"Inter", "Helvetica Neue", Arial, sans-serif';

  // Used only if the index cannot be fetched (e.g. opening the file directly).
  const FALLBACK = [
    ["Machine learning", ["AI", "Python"]],
    ["Neural networks", ["AI"]],
    ["Event loop", ["JavaScript", "Web Dev"]],
    ["CORS", ["Web Dev"]],
    ["gRPC", ["Network"]],
    ["SSH", ["Linux", "Network"]],
    ["Binary heap", ["Algorithms"]],
    ["Dijkstra", ["Algorithms", "Graphs"]],
    ["Topological sort", ["Graphs"]],
    ["Kubernetes", ["Containers"]],
    ["Virtual machines", ["Containers", "Linux"]],
    ["Obsidian workflow", ["Obsidian", "Publishing"]],
  ].map(([title, tags]) => ({ slug: "", title, tags }));

  let width = 0;
  let height = 0;
  let nodes = [];
  let links = [];
  let colors = {};
  let alpha = 1;
  let hovered = null;
  let dragging = null;
  let dragMoved = false;
  let running = false;
  let onScreen = true;
  const pointer = { x: 0, y: 0, inside: false };

  /* ------------------------------------------------------------ helpers */
  function readColors() {
    const styles = getComputedStyle(document.documentElement);
    const get = (name) => styles.getPropertyValue(name).trim();
    colors = {
      ink: get("--ink"),
      muted: get("--muted"),
      blue: get("--blue"),
      yellow: get("--yellow"),
      paper: get("--paper"),
      line: get("--line"),
    };
  }

  function rgba(hex, opacity) {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${opacity})`;
  }

  function cleanTag(tag) {
    return String(tag).split("/").pop().trim();
  }

  function nodeAt(x, y, slack = 6) {
    let best = null;
    let bestDist = Infinity;
    for (const node of nodes) {
      const d = Math.hypot(node.x - x, node.y - y);
      if (d < node.r + slack && d < bestDist) {
        best = node;
        bestDist = d;
      }
    }
    return best;
  }

  /* ------------------------------------------------------------ build */
  function build(posts) {
    const topics = new Map();
    nodes = [];
    links = [];

    posts.forEach((post) => {
      const note = {
        type: "note",
        label: post.title,
        slug: post.slug,
        r: 3.2,
        charge: 1,
        neighbors: new Set(),
      };
      nodes.push(note);

      [...new Set((post.tags || []).map(cleanTag))].forEach((tag) => {
        let topic = topics.get(tag);
        if (!topic) {
          topic = { type: "topic", label: tag, count: 0, charge: 2.2, neighbors: new Set() };
          topics.set(tag, topic);
        }
        topic.count += 1;
        links.push({ source: note, target: topic });
        note.neighbors.add(topic);
        topic.neighbors.add(note);
      });
    });

    const topicList = [...topics.values()];
    topicList.forEach((topic) => {
      topic.r = 4.5 + Math.sqrt(topic.count) * 2.6;
      nodes.push(topic);
    });
    topicList
      .sort((a, b) => b.count - a.count)
      .slice(0, LABELLED_TOPICS)
      .forEach((topic) => {
        topic.pinnedLabel = true;
      });

    // Everything starts at the centre and bursts outward.
    const cx = width / 2;
    const cy = height / 2;
    nodes.forEach((node) => {
      const angle = Math.random() * Math.PI * 2;
      node.phase = Math.random() * Math.PI * 2;
      if (reduceMotion) {
        const d = Math.random() * Math.min(width, height) * 0.4;
        node.x = cx + Math.cos(angle) * d;
        node.y = cy + Math.sin(angle) * d;
        node.vx = 0;
        node.vy = 0;
      } else {
        const burst = 4 + Math.random() * 9;
        node.x = cx + Math.cos(angle) * 4;
        node.y = cy + Math.sin(angle) * 4;
        node.vx = Math.cos(angle) * burst;
        node.vy = Math.sin(angle) * burst;
      }
    });

    if (caption && posts !== FALLBACK) {
      const how = window.matchMedia("(pointer: fine)").matches
        ? "Hover to trace a topic, click to open it, drag to rearrange."
        : "Tap a topic or a note to open it.";
      caption.textContent = `${posts.length} notes linked across ${topics.size} topics. ${how}`;
    }

    if (reduceMotion) {
      alpha = 1;
      for (let i = 0; i < 320; i += 1) step(0);
      alpha = 0;
    }
  }

  /* ------------------------------------------------------------ physics */
  function step(time) {
    const cx = width / 2;
    const cy = height / 2;
    const area = Math.sqrt((width * height) / (560 * 460));
    const count = nodes.length;

    // Repulsion between every pair (fine for a few hundred nodes).
    for (let i = 0; i < count; i += 1) {
      const a = nodes[i];
      for (let j = i + 1; j < count; j += 1) {
        const b = nodes[j];
        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 > 48000) continue;
        if (d2 < 1) {
          dx = Math.random() - 0.5;
          dy = Math.random() - 0.5;
          d2 = 1;
        }
        const w = (18 * area * a.charge * b.charge * alpha) / d2;
        a.vx -= dx * w;
        a.vy -= dy * w;
        b.vx += dx * w;
        b.vy += dy * w;
      }
    }

    // Springs between each note and its topics.
    links.forEach(({ source, target }) => {
      const rest = (18 + target.r) * area;
      let dx = target.x + target.vx - source.x - source.vx;
      let dy = target.y + target.vy - source.y - source.vy;
      const d = Math.hypot(dx, dy) || 1;
      const k = ((d - rest) / d) * alpha * 0.55;
      dx *= k;
      dy *= k;
      const bias = source.neighbors.size / (source.neighbors.size + target.neighbors.size);
      target.vx -= dx * bias;
      target.vy -= dy * bias;
      source.vx += dx * (1 - bias);
      source.vy += dy * (1 - bias);
    });

    const aspect = width / Math.max(height, 1);
    nodes.forEach((node) => {
      // Gentle pull to the centre, stronger on the short axis.
      node.vx += (cx - node.x) * 0.028 * alpha;
      node.vy += (cy - node.y) * 0.028 * alpha * aspect;

      // Idle breathing so the graph never looks frozen.
      if (!reduceMotion) {
        node.vx += Math.cos(time * 0.0007 + node.phase) * 0.018;
        node.vy += Math.sin(time * 0.0009 + node.phase) * 0.018;
      }

      // The cursor parts the nodes around it.
      if (pointer.inside && !dragging && node !== hovered) {
        const dx = node.x - pointer.x;
        const dy = node.y - pointer.y;
        const d = Math.hypot(dx, dy);
        if (d < 70 && d > 0.1) {
          const push = ((70 - d) / 70) * 0.9;
          node.vx += (dx / d) * push;
          node.vy += (dy / d) * push;
        }
      }

      if (node === dragging) {
        node.vx = 0;
        node.vy = 0;
        node.x = pointer.x;
        node.y = pointer.y;
        return;
      }

      node.vx *= 0.6;
      node.vy *= 0.6;
      node.x += node.vx;
      node.y += node.vy;

      const pad = node.r + 6;
      node.x = Math.max(pad, Math.min(width - pad, node.x));
      node.y = Math.max(pad, Math.min(height - pad, node.y));
    });

    alpha += (0.06 - alpha) * 0.02;
  }

  /* ------------------------------------------------------------ drawing */
  // Returns false (and draws nothing) if the label would collide with one already drawn.
  function drawLabel(node, strong, placed) {
    const size = strong ? 14 : 12;
    ctx.font = `${strong ? 700 : 600} ${size}px ${FONT}`;
    if (placed) {
      const w = ctx.measureText(node.label).width + 6;
      const box = { x: node.x - w / 2, y: node.y - node.r - 6 - size, w, h: size + 2 };
      const hit = placed.some((b) => box.x < b.x + b.w && b.x < box.x + box.w && box.y < b.y + b.h && b.y < box.y + box.h);
      if (hit) return false;
      placed.push(box);
    }
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    const y = node.y - node.r - 6;

    if (strong) {
      const text = node.label.length > 44 ? `${node.label.slice(0, 42)}…` : node.label;
      const w = ctx.measureText(text).width + 18;
      const h = size + 10;
      const x = Math.max(w / 2 + 4, Math.min(width - w / 2 - 4, node.x));
      const top = Math.max(4, y - h + 3);
      ctx.fillStyle = colors.ink;
      ctx.beginPath();
      ctx.roundRect(x - w / 2, top, w, h, 4);
      ctx.fill();
      ctx.fillStyle = colors.paper;
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, top + h / 2 + 1);
      return;
    }

    const half = ctx.measureText(node.label).width / 2 + 3;
    const x = Math.max(half, Math.min(width - half, node.x));
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.strokeStyle = rgba(colors.paper, 0.9);
    ctx.strokeText(node.label, x, y);
    ctx.fillStyle = colors.ink;
    ctx.fillText(node.label, x, y);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    const focus = hovered || dragging;
    const lit = focus ? focus.neighbors : null;

    // Links
    ctx.lineWidth = 1;
    ctx.strokeStyle = rgba(colors.line, focus ? 0.07 : 0.2);
    ctx.beginPath();
    links.forEach(({ source, target }) => {
      if (focus && (source === focus || target === focus)) return;
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
    });
    ctx.stroke();

    if (focus) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = colors.blue;
      ctx.beginPath();
      links.forEach(({ source, target }) => {
        if (source !== focus && target !== focus) return;
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
      });
      ctx.stroke();
    }

    // Nodes: notes first so topics sit on top.
    const ordered = [...nodes].sort((a, b) => (a.type === b.type ? 0 : a.type === "note" ? -1 : 1));
    ordered.forEach((node) => {
      const isFocus = node === focus;
      const isLit = lit?.has(node);
      ctx.globalAlpha = focus && !isFocus && !isLit ? 0.22 : 1;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + (isFocus ? 2.5 : 0), 0, Math.PI * 2);

      if (node.type === "topic") {
        ctx.fillStyle = isFocus || isLit ? colors.yellow : colors.blue;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = colors.line;
        ctx.stroke();
      } else {
        ctx.fillStyle = isFocus || isLit ? colors.yellow : colors.ink;
        ctx.fill();
        if (isFocus || isLit) {
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = colors.line;
          ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;

    // Labels
    const placed = [];
    if (focus) {
      lit.forEach((node) => {
        if (node.type === "topic") drawLabel(node, false, placed);
      });
      drawLabel(focus, true);
    } else {
      // Biggest topics claim their label space first.
      nodes
        .filter((node) => node.pinnedLabel)
        .sort((a, b) => b.count - a.count)
        .forEach((node) => drawLabel(node, false, placed));
    }
  }

  /* ------------------------------------------------------------ loop */
  function frame(time) {
    if (!running) return;
    step(time);
    draw();
    requestAnimationFrame(frame);
  }

  function start() {
    if (reduceMotion || running || !onScreen || document.hidden) return;
    running = true;
    requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
  }

  function kick(amount) {
    alpha = Math.max(alpha, amount);
  }

  /* ------------------------------------------------------------ sizing */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const oldW = width;
    const oldH = height;
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (oldW && oldH && nodes.length) {
      nodes.forEach((node) => {
        node.x *= width / oldW;
        node.y *= height / oldH;
      });
      kick(0.3);
    }
    if (nodes.length) draw();
  }

  /* ------------------------------------------------------------ input */
  function localPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function open(node) {
    if (!node.slug && node.type === "note") return;
    const url = node.type === "note"
      ? `notes.html#${encodeURIComponent(node.slug)}`
      : `notes.html?tag=${encodeURIComponent(node.label)}`;
    (window.siteNavigate || ((href) => { window.location.href = href; }))(url);
  }

  canvas.addEventListener("pointermove", (event) => {
    const { x, y } = localPoint(event);
    pointer.x = x;
    pointer.y = y;
    pointer.inside = true;

    if (dragging) {
      if (Math.hypot(x - dragging.startX, y - dragging.startY) > 4) dragMoved = true;
      kick(0.25);
    } else if (event.pointerType !== "touch") {
      hovered = nodeAt(x, y);
      canvas.style.cursor = hovered ? "pointer" : "grab";
    }
    if (reduceMotion) draw();
  });

  canvas.addEventListener("pointerleave", () => {
    pointer.inside = false;
    if (!dragging) hovered = null;
    if (reduceMotion) draw();
  });

  canvas.addEventListener("pointerdown", (event) => {
    const { x, y } = localPoint(event);
    const node = nodeAt(x, y, event.pointerType === "touch" ? 12 : 6);
    if (!node) return;

    // Touch: a tap opens the node; dragging would fight page scrolling.
    if (event.pointerType === "touch") {
      open(node);
      return;
    }

    dragging = node;
    dragging.startX = x;
    dragging.startY = y;
    dragMoved = false;
    pointer.x = x;
    pointer.y = y;
    canvas.setPointerCapture(event.pointerId);
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointerup", (event) => {
    if (!dragging) return;
    const node = dragging;
    dragging = null;
    canvas.releasePointerCapture?.(event.pointerId);
    canvas.style.cursor = hovered ? "pointer" : "grab";
    if (!dragMoved) open(node);
    else kick(0.3);
  });

  /* ------------------------------------------------------------ boot */
  readColors();
  window.addEventListener("themechange", () => {
    readColors();
    draw();
  });

  new ResizeObserver(resize).observe(canvas);

  new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    if (onScreen) start();
    else stop();
  }).observe(canvas);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });

  async function load() {
    resize();
    let posts = FALLBACK;
    try {
      // "no-cache" revalidates with the server, so a freshly rebuilt index
      // appears on the next refresh instead of a stale cached copy.
      const response = await fetch(INDEX_URL, { cache: "no-cache" });
      if (response.ok) posts = await response.json();
    } catch {
      /* keep the fallback graph */
    }
    if (document.fonts?.ready) await document.fonts.ready;
    build(posts);
    draw();
    start();
  }

  load();
})();
