# AiSite

Personal website, hosted with GitHub Pages. It's a static site made of plain HTML, CSS, and JavaScript, with no build step.

## Pages

- `index.html`: home page
- `resume.html`: resume
- `hobbies.html`: hobbies mind map
- `favorites.html`: favorites
- `anime.html`: anime and manga lists, pulled live from AniList
- `faq.html`: FAQ

## Project layout

```
css/style.css        Shared styles
js/config.js         Personal details, AniList username, social links
js/main.js           Shared behaviour (navbar, layout)
js/anime.js          Fetches AniList data and renders the anime/manga lists
js/anime-groups.js   Franchise groupings for anime cards
js/hobbies.js        Hobbies mind map
js/favorites.js      Favorites page
```

## Editing

- **Personal details and links:** edit `js/config.js`.
- **Anime groupings:** edit `js/anime-groups.js`. Entries can be AniList IDs or titles. Groups only appear on the Completed tab, so a franchise shows as separate cards while you're still watching it.
- **AniList data:** the anime and manga lists are fetched from the public AniList API each time the page loads. The AniList profile must be public.

## Previewing locally

No build is needed. Open any `.html` file in a browser, or serve the folder with a simple local server, for example:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`. The anime page needs a server (or a browser that allows the AniList request) to load your data.

## Deploying

GitHub Pages publishes the `main` branch of the `ArunJayaraman95.github.io` repository. Push changes to that branch and the site updates within a minute or two.

Links:
Instagram
Tiktok
Twitter
Snapchat?
LinkedIn
Github
LetterBoxd
MyAnimeList
Spotify

Sports
USATT Rating
USTA Rating
Golf Average/Handicap