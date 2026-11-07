// ============================================================
//  Your hobbies, grouped into mind-map categories. Edit freely:
//  add/remove categories or hobbies, change emojis and colors.
//  Bubble sizes and positions are worked out automatically.
// ============================================================
const HOBBY_MAP = [
  {
    name: "Sports", emoji: "🎾", color: "#ff7a59",
    hobbies: [
      ["🎾", "Tennis"], ["🥒", "Pickleball"], ["🏸", "Badminton"], ["🏓", "Table Tennis"],
      ["🔵", "Racquetball"], ["🏐", "Volleyball"], ["⛳", "Golf"],
    ],
  },
  {
    name: "Adventure & Outdoors", emoji: "🏂", color: "#22b3a0",
    hobbies: [
      ["🏂", "Snowboarding"], ["⛷️", "Skiing"], ["🛹", "Longboarding"],
      ["🧗", "Rock Climbing"], ["🏍️", "Motorcycling"],
    ],
  },
  {
    name: "Art & Music", emoji: "🎨", color: "#c06bfa",
    hobbies: [
      ["🖌️", "Painting"], ["✏️", "Drawing"], ["🎞️", "3D Animation"],
      ["🎸", "Guitar"], ["🎶", "Bass Guitar"],
    ],
  },
  {
    name: "Skills & Tinkering", emoji: "🛠️", color: "#eaa21b",
    hobbies: [["💻", "Coding"], ["🖨️", "3D Printing"], ["🤹", "Juggling"], ["🎪", "Unicycle"]],
  },
  {
    name: "Entertainment", emoji: "🎮", color: "#5b8cff",
    hobbies: [["📺", "Anime"], ["🎮", "Video Games"], ["♦️", "Poker"]],
  },
];
// ============================================================

(function () {
  const stage = document.getElementById("mindmap");
  const world = stage.querySelector(".mm-world");
  const svg = world.querySelector("svg");
  const backBtn = document.getElementById("mm-back");
  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const GAP = 22;            // space between bubbles (world px)

  // ---------- Build DOM once ----------
  const center = document.createElement("div");
  center.className = "mm-center";
  center.innerHTML = `<span>${esc(window.SITE?.name || "Me")}</span>`;
  world.append(center);

  const bubbles = HOBBY_MAP.map((cat, ci) => {
    const link = document.createElementNS("http://www.w3.org/2000/svg", "path");
    link.setAttribute("class", "mm-link");
    link.style.stroke = cat.color;
    svg.append(link);

    const el = document.createElement("div");
    el.className = "mm-bubble";
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `${cat.name}: ${cat.hobbies.map(h => h[1]).join(", ")}`);
    el.style.setProperty("--c", cat.color);
    el.style.setProperty("--float-delay", `${-ci * 1.3}s`);
    el.innerHTML = `
      <div class="mm-content">
        <div class="mm-title"><span class="emoji">${cat.emoji}</span>${esc(cat.name)}</div>
        <div class="mm-pills">${cat.hobbies.map(([e, n]) =>
          `<span class="mm-pill"><span class="emoji">${e}</span>${esc(n)}</span>`).join("")}</div>
      </div>`;
    el.addEventListener("click", ev => { ev.stopPropagation(); zoom(active === ci ? null : ci); });
    el.addEventListener("keydown", ev => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); zoom(active === ci ? null : ci); }
    });
    world.append(el);
    return { el, link, content: el.querySelector(".mm-content"), x: 0, y: 0, r: 0 };
  });

  // ---------- Sizing: smallest circle that fits each bubble's content ----------
  function sizeBubbles() {
    for (const b of bubbles) {
      let best = Infinity, bestW = 0;
      for (let w = 150; w <= 300; w += 10) {
        b.content.style.width = w + "px";
        const h = b.content.offsetHeight;
        const d = Math.hypot(w, h);                      // rectangle inscribed in a circle
        if (d < best) { best = d; bestW = w; }
      }
      b.content.style.width = bestW + "px";
      b.r = best / 2 + 14;                               // + padding inside the circle
      b.el.style.width = b.el.style.height = b.r * 2 + "px";
    }
    const cw = center.firstElementChild.offsetWidth;
    center.r = Math.max(52, cw / 2 + 18);
    center.style.width = center.style.height = center.r * 2 + "px";
  }

  // ---------- Packing: bubbles drift toward the center and push each other apart ----------
  function pack(W, H) {
    const n = bubbles.length;
    // pull harder along the stage's short side so the cluster matches its shape
    const gx = 0.03 * Math.min(1, H / W), gy = 0.03 * Math.min(1, W / H);
    bubbles.forEach((b, i) => {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      const dist = center.r + b.r + GAP;
      b.x = Math.cos(a) * dist * 1.6; b.y = Math.sin(a) * dist * 1.6;
    });
    for (let it = 0; it < 500; it++) {
      for (const b of bubbles) { b.x -= b.x * gx; b.y -= b.y * gy; }
      for (let i = 0; i < n; i++) {
        const a = bubbles[i];
        // the center node is fixed at (0,0)
        push(a, { x: 0, y: 0, r: center.r }, true);
        for (let j = i + 1; j < n; j++) push(a, bubbles[j], false);
      }
    }
    function push(a, b, fixed) {
      let dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy) || 0.01;
      const min = a.r + b.r + GAP;
      if (d >= min) return;
      const o = (min - d) / d;
      if (fixed) { a.x += dx * o; a.y += dy * o; }
      else { a.x += dx * o / 2; a.y += dy * o / 2; b.x -= dx * o / 2; b.y -= dy * o / 2; }
    }
  }

  // ---------- Layout ----------
  let active = null, view = null;

  function layout() {
    const W = stage.clientWidth, H = stage.clientHeight;
    stage.classList.toggle("compact", W < 560);
    sizeBubbles();
    pack(W, H);

    // bounding box of the whole cluster -> fit it to the stage
    let minX = -center.r, maxX = center.r, minY = -center.r, maxY = center.r;
    for (const b of bubbles) {
      minX = Math.min(minX, b.x - b.r); maxX = Math.max(maxX, b.x + b.r);
      minY = Math.min(minY, b.y - b.r); maxY = Math.max(maxY, b.y + b.r);
    }
    const pad = 20;
    const fit = Math.min((W - pad * 2) / (maxX - minX), (H - pad * 2) / (maxY - minY), 1.15);
    view = { W, H, fit, ox: -(minX + maxX) / 2, oy: -(minY + maxY) / 2 };

    place(center, 0, 0);
    bubbles.forEach(b => {
      place(b.el, b.x, b.y);
      const mx = b.x / 2, my = b.y / 2;
      b.link.setAttribute("d", `M0,0 Q${mx - b.y * 0.12},${my + b.x * 0.12} ${b.x},${b.y}`);
    });
    applyTransform(true);
  }

  function place(el, x, y) { el.style.left = x + "px"; el.style.top = y + "px"; }

  // World coords are centered on the name node; transform maps them onto the stage.
  function applyTransform(instant) {
    const { W, H } = view;
    let s, cx, cy;
    if (active === null) { s = view.fit; cx = -view.ox; cy = -view.oy; }
    else {
      const b = bubbles[active];
      s = Math.min(W, H) * 0.9 / (b.r * 2);
      cx = b.x; cy = b.y;
    }
    if (instant) world.style.transition = "none";
    world.style.transform = `translate(${W / 2 - cx * s}px, ${H / 2 - cy * s}px) scale(${s})`;
    if (instant) { world.offsetHeight; world.style.transition = ""; }
  }

  // ---------- Zoom ----------
  function zoom(ci) {
    active = ci;
    stage.classList.toggle("zoomed", ci !== null);
    bubbles.forEach((b, i) => {
      b.el.classList.toggle("active", i === ci);
      b.el.setAttribute("aria-expanded", i === ci);
    });
    backBtn.hidden = ci === null;
    applyTransform(false);
  }

  stage.addEventListener("click", () => { if (active !== null) zoom(null); });
  backBtn.addEventListener("click", ev => { ev.stopPropagation(); zoom(null); });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape" && active !== null) zoom(null); });

  let raf;
  new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); }).observe(stage);
  document.fonts?.ready.then(layout);
  layout();
})();
