// Fetches the user's anime list from the public AniList GraphQL API,
// merges franchises listed in js/anime-groups.js into single fan-out cards.
(async function () {
  const user = window.SITE.anilistUser;
  const GROUPS = window.ANIME_GROUPS || {};
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Loose title matching: case, curly quotes, dashes, × and extra spaces don't matter
  const norm = s => String(s).toLowerCase()
    .replace(/[’‘`]/g, "'").replace(/[–—]/g, "-").replace(/×/g, "x")
    .replace(/\s+/g, " ").trim();

  const QUERY = `
    query ($name: String) {
      User(name: $name) {
        name siteUrl
        statistics {
          anime { count meanScore episodesWatched minutesWatched }
          manga { count meanScore chaptersRead volumesRead }
        }
      }
      anime: MediaListCollection(userName: $name, type: ANIME) { ...lists }
      manga: MediaListCollection(userName: $name, type: MANGA) { ...lists }
    }
    fragment lists on MediaListCollection {
      lists {
        isCustomList
        entries {
          status progress updatedAt
          score(format: POINT_10_DECIMAL)
          media {
            id siteUrl episodes chapters format seasonYear
            title { userPreferred english romaji }
            coverImage { large }
          }
        }
      }
    }`;

  const STATUS_LABELS = {
    anime: [["CURRENT", "Watching"], ["COMPLETED", "Completed"]],
    manga: [["CURRENT", "Reading"], ["COMPLETED", "Completed"]],
  };
  const titleOf = e => e.media.title.english || e.media.title.userPreferred;
  // Fan layout: degrees between cards, max total spread, pivot distance (× card height)
  const FAN_STEP = 16, FAN_MAX = 96, FAN_ORIGIN = 2.2;
  let type = "anime", filter = "CURRENT", shown = [];
  const data = {};   // type -> { items, stats }

  // ---------- Fetch ----------
  let raw, userStats;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { name: user } }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);

    const u = json.data.User;
    $("anilist-link").href = u.siteUrl;
    userStats = u.statistics;
    raw = json.data;
  } catch (err) {
    $("list").outerHTML = `<div class="notice">
      Couldn't load the AniList profile <strong>${esc(user)}</strong> (${esc(err.message)}).<br>
      Set <code>anilistUser</code> in <code>js/config.js</code> to your AniList username,
      and make sure your list isn't set to private.</div>`;
    return;
  }

  // ---------- Build groups ----------
  function buildItems(collection, useGroups) {
    // Custom lists duplicate entries from the standard lists, so skip them
    const entries = collection.lists
      .filter(l => !l.isCustomList)
      .flatMap(l => l.entries)
      .map(e => ({ ...e, status: e.status === "REPEATING" ? "CURRENT" : e.status }));
    const items = [];
    const used = new Set();
    if (useGroups) {
      const lookup = new Map();
      for (const e of entries) {
        lookup.set(String(e.media.id), e);
        for (const t of Object.values(e.media.title)) if (t) lookup.set(norm(t), e);
      }
      for (const [name, list] of Object.entries(GROUPS)) {
        const members = [];
        for (const ref of list) {
          const e = lookup.get(typeof ref === "number" ? String(ref) : norm(ref));
          if (!e) { console.warn(`[anime-groups] "${name}": no list entry matches "${ref}"`); continue; }
          if (used.has(e)) { console.warn(`[anime-groups] "${ref}" is already in another group`); continue; }
          used.add(e); members.push(e);
        }
        if (members.length > 1) items.push(makeGroup(name, members));
        else if (members.length === 1) items.push(makeSingle(members[0]));
      }
    }
    for (const e of entries) if (!used.has(e)) items.push(makeSingle(e));
    return items;
  }
  data.anime = buildItems(raw.anime, true);
  data.manga = buildItems(raw.manga, false);

  function makeSingle(e) {
    return { kind: "single", title: titleOf(e), entries: [e], score: e.score, updatedAt: e.updatedAt };
  }
  function makeGroup(name, members) {
    const scored = members.filter(m => m.score);
    return {
      kind: "group", title: name, entries: members,
      score: scored.length ? +(scored.reduce((a, m) => a + m.score, 0) / scored.length).toFixed(1) : 0,
      updatedAt: Math.max(...members.map(m => m.updatedAt)),
    };
  }

  // ---------- Filters ----------
  function renderTabs() {
    $("types").innerHTML = [["anime", "Anime"], ["manga", "Manga"]].map(([k, l]) =>
      `<button class="chip" data-type="${k}" aria-pressed="${k === type}">${l}</button>`).join("");
  }
  // Items for one status: only entries with that status are included, and
  // groups are only kept together outside the "current" tab.
  function itemsFor(status) {
    return data[type].flatMap(it => {
      const members = it.entries.filter(e => e.status === status);
      if (!members.length) return [];
      if (it.kind === "single") return [it];
      if (status === "CURRENT" || members.length === 1) return members.map(makeSingle);
      return [makeGroup(it.title, members)];
    });
  }
  function renderFilters() {
    $("filters").innerHTML = STATUS_LABELS[type].map(([k, l]) =>
      `<button class="chip" data-status="${k}" aria-pressed="${k === filter}">${l} (${itemsFor(k).length})</button>`).join("");
  }
  function renderStats() {
    const s = userStats[type];
    const rows = type === "anime" ? [
      [s.count, "Anime"],
      [s.episodesWatched.toLocaleString(), "Episodes"],
      [(s.minutesWatched / 1440).toFixed(1), "Days watched"],
    ] : [
      [s.count, "Manga"],
      [s.chaptersRead.toLocaleString(), "Chapters"],
      [s.volumesRead.toLocaleString(), "Volumes"],
    ];
    rows.push([s.meanScore ? s.meanScore.toFixed(1) : "–", "Mean score"]);
    $("stats").innerHTML = rows.map(([n, l]) =>
      `<div class="stat"><div class="num">${n}</div><div class="label">${l}</div></div>`).join("");
  }
  $("types").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b || b.dataset.type === type) return;
    type = b.dataset.type; filter = "CURRENT";
    renderTabs(); renderFilters(); renderStats(); render();
  });
  $("filters").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    filter = b.dataset.status;
    $("filters").querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
    render();
  });
  $("search").addEventListener("input", render);
  $("sort").addEventListener("change", render);

  // ---------- Render ----------
  const epText = e => type === "anime"
    ? `${e.progress}/${e.media.episodes ?? "?"} ep`
    : `${e.progress}/${e.media.chapters ?? "?"} ch`;
  const scoreText = s => (s ? "★ " + s : "");

  function singleHTML(it) {
    const e = it.entries[0];
    return `
      <div class="anime-card">
        <img src="${esc(e.media.coverImage.large)}" alt="" loading="lazy">
        <div class="info">
          <div class="title">${esc(it.title)}</div>
          <div class="meta"><span>${epText(e)}</span><span>${scoreText(e.score)}</span></div>
        </div>
      </div>`;
  }

  function groupHTML(it, gi) {
    const n = it.entries.length;
    const spread = Math.min(FAN_STEP * (n - 1), FAN_MAX);   // total fan angle, degrees
    const step = spread / (n - 1);
    const [cover, second] = it.entries;
    const fan = it.entries.map((e, i) => {
      const r = ((i - (n - 1) / 2) * step).toFixed(2);
      return `
      <div class="fan-card${e.status !== filter ? " dim" : ""}" data-mi="${i}" data-r="${r}"
         style="--r:${r}deg; --d:${i * 22}ms; z-index:${i + 1}">
        <img src="${esc(e.media.coverImage.large)}" alt="${esc(titleOf(e))}" loading="lazy">
      </div>`;
    }).join("");
    return `
      <div class="anime-card group" tabindex="0" data-gi="${gi}" aria-label="${esc(it.title)}, ${n} entries">
        <div class="deck" style="--back:url('${esc(second.media.coverImage.large)}')">
          <img class="cover" src="${esc(cover.media.coverImage.large)}" alt="" loading="lazy">
          <span class="count-badge">${n}</span>
          <div class="fan">${fan}</div>
        </div>
        <div class="info">
          <div class="title">${esc(it.title)}</div>
          <div class="meta"><span>${n} entries</span><span>${scoreText(it.score)}</span></div>
        </div>
      </div>`;
  }

  function render() {
    const q = norm($("search").value);
    const sort = $("sort").value;
    shown = itemsFor(filter)
      .filter(it => !q || norm(it.title).includes(q) || it.entries.some(e =>
        Object.values(e.media.title).some(t => t && norm(t).includes(q))))
      .sort((a, b) =>
        sort === "score" ? b.score - a.score :
        sort === "title" ? a.title.localeCompare(b.title) :
        b.updatedAt - a.updatedAt);

    $("list").innerHTML = shown.length
      ? shown.map((it, i) => it.kind === "group" ? groupHTML(it, i) : singleHTML(it)).join("")
      : `<p class="muted">Nothing here.</p>`;
  }

  // ---------- Fan interactions ----------
  // While hovering a fanned card, show its title/score in the group's caption.
  function setCaption(g, e) {
    const it = shown[g.dataset.gi];
    const title = g.querySelector(".info .title");
    const meta = g.querySelector(".info .meta");
    if (e) {
      title.textContent = titleOf(e);
      meta.innerHTML = `<span>${epText(e)}</span><span>${scoreText(e.score)}</span>`;
    } else {
      title.textContent = it.title;
      meta.innerHTML = `<span>${it.entries.length} entries</span><span>${scoreText(it.score)}</span>`;
    }
  }
  // Geometry of a group's fan (must match the .fan-card CSS: width 90%, left 5%,
  // top 4%, transform-origin 50% FAN_ORIGIN*100%).
  function fanGeometry(g) {
    const rect = g.querySelector(".deck").getBoundingClientRect();
    const cw = rect.width * 0.9, ch = cw * 1.5;
    const radius = ch * FAN_ORIGIN;
    return { rect, cw, ch, radius, cx: rect.left + rect.width / 2, oy: rect.top + rect.height * 0.04 + radius };
  }

  // Slide the fan sideways so it never runs off the edge of the screen.
  function prepareFan(g) {
    const { cw, radius, cx } = fanGeometry(g);
    const cards = g.querySelectorAll(".fan-card");
    const maxA = Math.abs(+cards[cards.length - 1].dataset.r) * Math.PI / 180;
    const half = radius * Math.sin(maxA) + (cw / 2) * Math.cos(maxA);
    const vw = document.documentElement.clientWidth, pad = 8;
    let shift = 0;
    if (half * 2 > vw - pad * 2) shift = vw / 2 - cx;
    else if (cx + half > vw - pad) shift = vw - pad - (cx + half);
    else if (cx - half < pad) shift = pad - (cx - half);
    g.style.setProperty("--shift", shift.toFixed(1) + "px");
    g.dataset.shift = shift;
  }

  // Pick the card by the pointer's angle around the fan's pivot point, so sweeping
  // left/right steps through cards evenly no matter which card is drawn on top.
  function cardAt(g, x, y) {
    const { cx, oy } = fanGeometry(g);
    const angle = Math.atan2(x - (cx + +(g.dataset.shift || 0)), oy - y) * 180 / Math.PI;
    let best = null, bestD = Infinity;
    for (const c of g.querySelectorAll(".fan-card")) {
      const d = Math.abs(angle - c.dataset.r);
      if (d < bestD) { bestD = d; best = c; }
    }
    return best;
  }

  function setActive(g, card) {
    const prev = g.querySelector(".fan-card.active");
    if (prev === card) return;
    prev?.classList.remove("active");
    card?.classList.add("active");
    setCaption(g, card ? shown[g.dataset.gi].entries[card.dataset.mi] : null);
  }

  const list = $("list");
  let hovered = null;
  list.addEventListener("pointerover", ev => {
    if (ev.pointerType === "touch") return;
    const g = ev.target.closest(".group");
    if (g && g !== hovered) { hovered = g; prepareFan(g); }
  });
  list.addEventListener("pointermove", ev => {
    if (ev.pointerType === "touch" || !hovered) return;
    setActive(hovered, cardAt(hovered, ev.clientX, ev.clientY));
  });
  list.addEventListener("pointerout", ev => {
    const g = ev.target.closest(".group");
    if (g && !g.contains(ev.relatedTarget)) { setActive(g, null); if (g === hovered) hovered = null; }
  });

  // Touch screens have no hover: the first tap opens the fan, later taps
  // select a card by position; tapping outside closes it.
  const noHover = matchMedia("(hover: none)");
  document.addEventListener("click", ev => {
    if (!noHover.matches) return;
    const g = ev.target.closest(".group");
    document.querySelectorAll(".group.open").forEach(o => o !== g && (o.classList.remove("open"), setActive(o, null)));
    if (!g) return;
    if (!g.classList.contains("open")) { g.classList.add("open"); prepareFan(g); return; }
    setActive(g, cardAt(g, ev.clientX, ev.clientY));
  });

  renderTabs(); renderFilters(); renderStats(); render();
})();
