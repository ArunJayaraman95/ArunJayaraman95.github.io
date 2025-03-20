document.addEventListener("DOMContentLoaded", function () {
    function fetchAndDisplayList(status, type, elementId) {
        fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `{
                    MediaListCollection(userName: "SpiderJaw", type: ${type}, status: ${status}) {
                        lists {
                            entries {
                                media {
                                    title {
                                        english
                                        romaji
                                    }
                                    coverImage {
                                        extraLarge
                                    }
                                    chapters
                                }
                                progress
                            }
                        }
                    }
                }`
            })
        })
        .then(response => response.json())
        .then(data => {
            let animeList = document.getElementById(elementId);
            animeList.innerHTML = "";
            let entries = [];
            
            if (data.data.MediaListCollection.lists) {
                data.data.MediaListCollection.lists.forEach(list => {
                    list.entries.forEach(entry => {
                        let title = entry.media.title.english || entry.media.title.romaji || "Unknown Title";
                        let progress = entry.progress || 0;
                        let totalChapters = entry.media.chapters || "?";
                        let progressText = type === "MANGA" ? `${progress}/${totalChapters} Chapters` : "";
                        
                        entries.push({
                            title: title,
                            image: entry.media.coverImage.extraLarge,
                            progressText: progressText
                        });
                    });
                });
            }
            
            entries.sort((a, b) => a.title.localeCompare(b.title));
            
            entries.forEach(entry => {
                let animeItem = document.createElement("div");
                animeItem.classList.add("anime-item");
                animeItem.innerHTML = `
                    <img src="${entry.image}" alt="${entry.title}">
                    <p>${entry.title}</p>
                    <p>${entry.progressText}</p>
                `;
                animeList.appendChild(animeItem);
            });
        })
        .catch(error => console.error("Error fetching AniList data:", error));
    }
    
    fetchAndDisplayList("CURRENT", "ANIME", "anime-list-watching");
    fetchAndDisplayList("COMPLETED", "ANIME", "anime-list-completed");
    fetchAndDisplayList("PLANNING", "ANIME", "anime-list-planning");
    fetchAndDisplayList("CURRENT", "MANGA", "manga-list-current");
    fetchAndDisplayList("COMPLETED", "MANGA", "manga-list-completed");
});
