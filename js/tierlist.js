// ============================================================
//  Your tier lists. Edit these to set YOUR official rankings
//  (all filler). Items in "pool" are unranked.
// ============================================================
const TIER_LISTS = {
  "Anime": {
    S: ["Fullmetal Alchemist: Brotherhood", "Steins;Gate"],
    A: ["Attack on Titan", "Frieren", "Mob Psycho 100"],
    B: ["Demon Slayer", "Spy x Family"],
    C: ["Sword Art Online"],
    D: [],
    pool: ["Naruto", "One Piece", "Jujutsu Kaisen"],
  },
  "Video Games": {
    S: ["🗡️ Game One", "🌌 Game Two"],
    A: ["🏎️ Game Three"],
    B: ["🧩 Game Four"],
    C: [], D: [],
    pool: ["🎯 Game Five", "👾 Game Six"],
  },
  "Foods": {
    S: ["🍜 Ramen", "🍣 Sushi"],
    A: ["🍕 Pizza", "🌮 Tacos"],
    B: ["🍔 Burgers"],
    C: ["🥗 Salad"],
    D: ["🫒 Olives"],
    pool: [],
  },
};
// ============================================================

(function () {
  const TIERS = ["S", "A", "B", "C", "D"];
  const COLORS = { S: "--tier-s", A: "--tier-a", B: "--tier-b", C: "--tier-c", D: "--tier-d" };
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clone = o => JSON.parse(JSON.stringify(o));
  const key = name => "tierlist:" + name;

  let current = Object.keys(TIER_LISTS)[0];
  let state, selected = null;

  function load(name) {
    try {
      const saved = JSON.parse(localStorage.getItem(key(name)));
      if (saved) return saved;
    } catch {}
    return clone(TIER_LISTS[name]);
  }
  function save() { try { localStorage.setItem(key(current), JSON.stringify(state)); } catch {} }

  // Tabs
  $("tabs").innerHTML = Object.keys(TIER_LISTS).map(n =>
    `<button class="chip" data-name="${esc(n)}" aria-pressed="${n === current}">${esc(n)}</button>`).join("");
  $("tabs").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    current = b.dataset.name;
    $("tabs").querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
    state = load(current); selected = null; render();
  });

  function itemsHTML(list) {
    return (list || []).map(it =>
      `<div class="tier-item${it === selected ? " selected" : ""}" draggable="true" data-item="${esc(it)}">${esc(it)}</div>`).join("");
  }

  function render() {
    $("board").innerHTML = TIERS.map(t => `
      <div class="tier-row">
        <div class="tier-label" style="background:var(${COLORS[t]})">${t}</div>
        <div class="tier-items" data-tier="${t}">${itemsHTML(state[t])}</div>
      </div>`).join("");
    $("pool").innerHTML = itemsHTML(state.pool) ||
      `<span class="muted" style="padding:20px">Unranked items go here</span>`;
  }

  function move(item, toTier, beforeItem) {
    for (const t of [...TIERS, "pool"]) state[t] = (state[t] || []).filter(i => i !== item);
    const list = state[toTier];
    const idx = beforeItem ? list.indexOf(beforeItem) : -1;
    idx >= 0 ? list.splice(idx, 0, item) : list.push(item);
    selected = null; save(); render();
  }

  // Drag & drop (desktop)
  let dragging = null;
  document.addEventListener("dragstart", e => {
    const el = e.target.closest?.(".tier-item"); if (!el) return;
    dragging = el.dataset.item; el.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", dragging);
  });
  document.addEventListener("dragend", () => {
    dragging = null;
    document.querySelectorAll(".over, .dragging").forEach(el => el.classList.remove("over", "dragging"));
  });
  document.addEventListener("dragover", e => {
    const zone = e.target.closest?.("[data-tier]"); if (!zone || !dragging) return;
    e.preventDefault();
    document.querySelectorAll(".over").forEach(el => el !== zone && el.classList.remove("over"));
    zone.classList.add("over");
  });
  document.addEventListener("drop", e => {
    const zone = e.target.closest?.("[data-tier]"); if (!zone || !dragging) return;
    e.preventDefault();
    const before = e.target.closest(".tier-item")?.dataset.item;
    move(dragging, zone.dataset.tier, before !== dragging ? before : null);
  });

  // Tap to select, then tap a tier (mobile friendly)
  document.addEventListener("click", e => {
    const item = e.target.closest(".tier-item");
    if (item) {
      if (selected && selected !== item.dataset.item) {
        move(selected, item.parentElement.dataset.tier, item.dataset.item);
      } else {
        selected = selected === item.dataset.item ? null : item.dataset.item;
        render();
      }
      return;
    }
    const zone = e.target.closest("[data-tier]");
    if (zone && selected) move(selected, zone.dataset.tier);
  });

  $("reset").addEventListener("click", () => {
    try { localStorage.removeItem(key(current)); } catch {}
    state = clone(TIER_LISTS[current]); selected = null; render();
  });
  $("export").addEventListener("click", async () => {
    const json = JSON.stringify(state, null, 2);
    try { await navigator.clipboard.writeText(json); $("export").textContent = "Copied!"; }
    catch { prompt("Copy this:", json); }
    setTimeout(() => $("export").textContent = "Copy layout as JSON", 1500);
  });

  state = load(current);
  render();
})();
