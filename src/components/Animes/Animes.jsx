import React from 'react'
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import client from './apolloClient';
import styles from './Animes.module.css';


// Define the GraphQL query
const GET_USER_FAVORITES = gql`
  query {
    Page {
      users(name: "SpiderJaw") {
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

const GET_USER_WATCHED_ANIME = gql`
  query {
    MediaListCollection(userName: "SpiderJaw", type: ANIME) {
      lists {
        name
        entries {
          media {
            id
            title {
              english
              romaji
            }
            coverImage {
              extraLarge
            }
          }
        }
      }
    }
  }
`;

const sortEntriesAlphabetically = (entries) => {
  return [...entries].sort((a, b) => {
    const titleA = a.media.title.english || a.media.title.romaji;
    const titleB = b.media.title.english || b.media.title.romaji;
    return titleA.localeCompare(titleB);
  });
};

// Component to display the anime list
const AnimeList = () => {
  const { loading, error, data } = useQuery(GET_USER_WATCHED_ANIME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const completedList = data.MediaListCollection.lists.find(list => list.name === 'Completed');
  const watchingList = data.MediaListCollection.lists.find(list => list.name === 'Watching');
  
  console.log("Copmlete");
  console.log(completedList.entries);
  console.log("Copmlete2");
  console.log(sortEntriesAlphabetically(completedList.entries));

  return (
    <div>
      <h1>Arun's Anilist Overview</h1>
      <br/>
      <br/>
      <h2>Currently Watching</h2>
      <div className={styles.alist}>
        {watchingList ? sortEntriesAlphabetically(watchingList.entries).map(({ media }) => (
          <div key={media.id} className={styles.acard}>
            <img src={media.coverImage.extraLarge} alt={media.title.english} />
            <p>{media.title.english || media.title.romaji}</p>
          </div>
        )) : <p>No watching anime found.</p>}
      </div>
      <h2>Completed Anime</h2>
      <div className={styles.alist}>
        {completedList ? sortEntriesAlphabetically(completedList.entries).map(({ media }) => (
          <div key={media.id} className={styles.acard}>
            <img src={media.coverImage.extraLarge} alt={media.title.english} />
            <p>{media.title.english || media.title.romaji}</p>
          </div>
        )) : <p>No completed anime found.</p>}
      </div>
    </div>
  );
};


const Animes = () => {
  
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <AnimeList />
    </div>
  </ApolloProvider>
  )
}

export default Animes