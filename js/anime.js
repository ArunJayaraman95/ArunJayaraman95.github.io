// Fetches the user's anime list from the public AniList GraphQL API.
(async function () {
  const user = window.SITE.anilistUser;
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const QUERY = `
    query ($name: String) {
      User(name: $name) {
        name siteUrl
        statistics { anime { count meanScore episodesWatched minutesWatched } }
      }
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          isCustomList
          entries {
            status progress updatedAt
            score(format: POINT_10_DECIMAL)
            media {
              id siteUrl episodes format seasonYear
              title { userPreferred english }
              coverImage { large }
            }
          }
        }
      }
    }`;

  const STATUSES = [
    ["ALL", "All"], ["CURRENT", "Watching"], ["COMPLETED", "Completed"],
    ["PLANNING", "Plan to watch"], ["PAUSED", "Paused"], ["DROPPED", "Dropped"],
  ];
  let entries = [], filter = "ALL";

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
    const s = u.statistics.anime;
    $("stats").innerHTML = [
      [s.count, "Anime"],
      [s.episodesWatched.toLocaleString(), "Episodes"],
      [(s.minutesWatched / 1440).toFixed(1), "Days watched"],
      [s.meanScore ? s.meanScore.toFixed(1) : "–", "Mean score"],
    ].map(([n, l]) => `<div class="stat"><div class="num">${n}</div><div class="label">${l}</div></div>`).join("");

    // Custom lists duplicate entries from the standard lists, so skip them
    entries = json.data.MediaListCollection.lists
      .filter(l => !l.isCustomList)
      .flatMap(l => l.entries)
      .map(e => ({ ...e, status: e.status === "REPEATING" ? "CURRENT" : e.status }));
  } catch (err) {
    $("list").outerHTML = `<div class="notice">
      Couldn't load the AniList profile <strong>${esc(user)}</strong> (${esc(err.message)}).<br>
      Set <code>anilistUser</code> in <code>js/config.js</code> to your AniList username,
      and make sure your list isn't set to private.</div>`;
    return;
  }

  const counts = { ALL: entries.length };
  entries.forEach(e => counts[e.status] = (counts[e.status] || 0) + 1);
  $("filters").innerHTML = STATUSES.map(([k, l]) =>
    `<button class="chip" data-status="${k}" aria-pressed="${k === filter}">${l} (${counts[k] || 0})</button>`).join("");
  $("filters").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    filter = b.dataset.status;
    $("filters").querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === b));
    render();
  });
  $("search").addEventListener("input", render);
  $("sort").addEventListener("change", render);

  function render() {
    const q = $("search").value.trim().toLowerCase();
    const sort = $("sort").value;
    const title = e => e.media.title.english || e.media.title.userPreferred;
    const shown = entries
      .filter(e => filter === "ALL" || e.status === filter)
      .filter(e => !q || title(e).toLowerCase().includes(q) || e.media.title.userPreferred.toLowerCase().includes(q))
      .sort((a, b) =>
        sort === "score" ? b.score - a.score :
        sort === "title" ? title(a).localeCompare(title(b)) :
        b.updatedAt - a.updatedAt);

    $("list").innerHTML = shown.length ? shown.map(e => `
      <a class="anime-card" href="${esc(e.media.siteUrl)}" target="_blank" rel="noopener">
        <img src="${esc(e.media.coverImage.large)}" alt="" loading="lazy">
        <div class="info">
          <div class="title">${esc(title(e))}</div>
          <div class="meta">
            <span>${e.progress}/${e.media.episodes ?? "?"} ep</span>
            <span>${e.score ? "★ " + e.score : ""}</span>
          </div>
        </div>
      </a>`).join("") : `<p class="muted">Nothing here.</p>`;
  }
  render();
})();
