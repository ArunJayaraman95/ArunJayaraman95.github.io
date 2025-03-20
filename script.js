document.addEventListener("DOMContentLoaded", function () {
    fetch("https://graphql.anilist.co", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            query: `{
                MediaListCollection(userName: "SpiderJaw", type: ANIME, status: CURRENT) {
                    lists {
                        entries {
                            media {
                                title {
                                    english
                                }
                                coverImage {
                                    medium
                                }
                            }
                        }
                    }
                }
            }`
        })
    })
    .then(response => response.json())
    .then(data => {
        let animeList = document.getElementById("anime-list");
        animeList.innerHTML = "";
        
        if (data.data.MediaListCollection.lists) {
            data.data.MediaListCollection.lists.forEach(list => {
                list.entries.forEach(entry => {
                    let animeItem = document.createElement("div");
                    animeItem.classList.add("anime-item");
                    animeItem.innerHTML = `
                        <img src="${entry.media.coverImage.medium}" alt="${entry.media.title.english}">
                        <p>${entry.media.title.english || "No English Title Available"}</p>
                    `;
                    animeList.appendChild(animeItem);
                });
            });
        } else {
            animeList.innerHTML = `<p>No currently watching anime found.</p>`;
        }
    })
    .catch(error => console.error("Error fetching AniList data:", error));
});
