// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query {
    Page {
      users(name:"SpiderJaw") {
        name
        id
        favourites {
          anime {
            nodes {
              id
              title {
                english
              }
              coverImage {
                extraLarge
              }
            }
          }
        }
      }
    }
  }
  
`;

// Define our query variables and values that will be used in the query request
var variables = {
  id: 1,
};

// Define the config we'll need for our Api request
var url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

// Make the HTTP Api request
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

const continentSelect = document.getElementById("continent-select");
const countryList = document.getElementById("countries-list");
const usernameTitle = document.getElementById("TitleBoi");

function handleData(data) {
  var siteUserName = data.data.Page.users[0].name;
  var animeList = data.data.Page.users[0].favourites.anime.nodes;
  usernameTitle.innerHTML = siteUserName;

  animeList.forEach((anime) => {
    var title = anime.title.english;
    var imageSrc = anime.coverImage.extraLarge;

    console.log(title);
    console.log(imageSrc);
    createCard(title, imageSrc);
  });

  console.log(data.data.Page);
  console.log(data.data.Page.users[0].favourites.anime.nodes);
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}

function createCard(text, imageUrl) {
  // Create card container
  var cardContainer = document.getElementById("cardContainer");

  // Create card element
  var card = document.createElement("div");
  card.classList.add("card");

  // Create image element
  var img = document.createElement("img");
  img.src = imageUrl;
  img.classList.add("card-image");

  // Create h2 element
  var heading = document.createElement("h2");
  heading.textContent = text;
  heading.classList.add("card-text");

  // Append elements to card
  card.appendChild(img);
  card.appendChild(document.createElement("br")); // Line break
  card.appendChild(heading);

  // Append card to container
  cardContainer.appendChild(card);
}
