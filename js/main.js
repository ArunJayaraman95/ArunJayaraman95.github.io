// Shared header / footer / theme toggle for every page.
(function () {
  const S = window.SITE;
  const pages = [
    ["index.html", "Home"],
    ["resume.html", "Resume"],
    ["hobbies.html", "Hobbies"],
    ["anime.html", "Anime"],
    ["tierlist.html", "Tier Lists"],
    ["faq.html", "FAQ"],
  ];
  const here = location.pathname.split("/").pop() || "index.html";

  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="brand" href="index.html">${S.name}</a>
    <button class="menu-btn" aria-label="Menu" aria-expanded="false">☰</button>
    <nav>
      ${pages.map(([href, label]) =>
        `<a href="${href}" ${href === here ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
      <button class="theme-btn" aria-label="Toggle theme">◐</button>
    </nav>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div>${S.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join(" · ")}</div>
    <div class="muted">© ${new Date().getFullYear()} ${S.name}</div>`;
  document.body.append(footer);

  // Fill any [data-site="key"] elements with config values
  document.querySelectorAll("[data-site]").forEach(el => {
    el.textContent = S[el.dataset.site] ?? "";
  });

  // Mobile menu
  const btn = header.querySelector(".menu-btn");
  btn.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // Theme toggle (remembered per browser)
  const root = document.documentElement;
  try { const t = localStorage.getItem("theme"); if (t) root.dataset.theme = t; } catch {}
  header.querySelector(".theme-btn").addEventListener("click", () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });
})();
