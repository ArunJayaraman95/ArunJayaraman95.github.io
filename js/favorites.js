// ============================================================
//  Your Top 3 favorites. Fill in the blanks!
//    title: the name ("" = blank, shows a placeholder)
//    note:  optional short line shown under the title
//    image: optional image/poster URL (otherwise the category emoji is shown)
//  Add, remove or reorder categories freely. Picks are listed #1, #2, #3.
// ============================================================
const FAVORITES = [
  { category: "Anime", emoji: "📺", picks: [
    { title: "Jojo's Bizarre Adventure", note: "", image: "https://static.jojowiki.com/images/thumb/5/5b/latest/20260115173340/Steel_Ball_Run_Anime_Key_Visual.jpg/800px-Steel_Ball_Run_Anime_Key_Visual.jpg" },
    { title: "One Punch Man", note: "", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfx3xZQXyUtTHdGCgm7cv_dR_XoTjLdSScfUVwmnuvg-MHt0_2ujyv_RfL&s=10" },
    { title: "Demon Slayer", note: "", image: "https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_.jpg" },
  ]},
  { category: "Movies", emoji: "🎬", picks: [
    { title: "The Raid: Redemption", note: "", image: "https://m.media-amazon.com/images/M/MV5BOGUxM2Q0MzItZDRmYy00ZWY1LWFiNzctNmY3Njg2ODJjZWNmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { title: "The Mask", note: "", image: "https://thumb.wikimedia.org/wikipedia/en/thumb/4/4b/The_Mask_%28film%29_poster.jpg/250px-The_Mask_%28film%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" },
    { title: "Dumb and Dumber", note: "", image: "https://upload.wikimedia.org/wikipedia/en/6/64/Dumbanddumber.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original" },
  ]},
  { category: "Video Games", emoji: "🎮", picks: [
    { title: "Fortnite", note: "", image: "https://m.media-amazon.com/images/M/MV5BMTZlMmIxM2EtN2Y4Zi00M2ZhLTk3NzgtNjJmZTU0MTQ3YjcwXkEyXkFqcGc@._V1_.jpg" },
    { title: "Elden Ring", note: "", image: "https://m.media-amazon.com/images/M/MV5BZGQxMjYyOTUtNjYyMC00NzdmLWI4YmYtMDhiODU3Njc5ZDJkXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg" },
    { title: "Factorio", note: "", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGosNZkBWW6vy-ClXcbKmBeuooy4Qy0GWbOqynSVp6jcrfqQb_jJQ5WaYZ&s=10" },
  ]},
  { category: "TV Shows", emoji: "📡", picks: [
    { title: "Psych", note: "", image: "https://resizing.flixster.com/2SEhtwuCTyyhu_F4suiTIuloGvc=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p185254_b_v12_aa.jpg" },
    { title: "Dexter", note: "", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQxSukC9fAlbIjjAy7w2HXXDz9N2oksKzk8hUfXfXZaA&s=10" },
    { title: "South Park", note: "", image: "https://m.media-amazon.com/images/M/MV5BNTBlMzA3ZTUtODZjNi00NTM0LWExMjMtNjJhYzA3YTkwMWYwXkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg" },
  ]},
  { category: "Cartoons", emoji: "💭", picks: [
    { title: "The Amazing World of Gumball", note: "", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlDmHwkvBpXLy12XXPJ_hEoj5u-i3o5KWHBbd0ADjHP5xJEKHfDOPxVUfx&s=10" },
    { title: "Regular Show", note: "", image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9149981_b_v8_aa.jpg" },
    { title: "Teen Titans Go", note: "", image: "https://m.media-amazon.com/images/M/MV5BMjE5MjMzOTc1Ml5BMl5BanBnXkFtZTcwNDQxMDY5OQ@@._V1_FMjpg_UX1000_.jpg" },
  ]},
  { category: "Anime Characters", emoji: "👦🏽", picks: [
    { title: "", note: "", image: "" },
    { title: "", note: "", image: "" },
    { title: "", note: "", image: "" },
  ]},
];
// ============================================================

(function () {
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  document.getElementById("favorites").innerHTML = FAVORITES.map(cat => `
    <section class="fav-card">
      <h2 class="fav-head"><span class="emoji">${cat.emoji}</span>${esc(cat.category)}</h2>
      <ol class="podium">
        ${cat.picks.slice(0, 3).map((p, i) => {
          const blank = !p.title;
          return `
          <li class="spot rank-${i + 1}${blank ? " blank" : ""}">
            <div class="thumb">${p.image && !blank
              ? `<img src="${esc(p.image)}" alt="" loading="lazy">`
              : `<span class="emoji">${blank ? "?" : cat.emoji}</span>`}</div>
            <div class="name">${blank ? "Coming soon" : esc(p.title)}</div>
            ${p.note && !blank ? `<div class="note">${esc(p.note)}</div>` : ""}
            <div class="step"><span>${i + 1}</span></div>
          </li>`;
        }).join("")}
      </ol>
    </section>`).join("");
})();
