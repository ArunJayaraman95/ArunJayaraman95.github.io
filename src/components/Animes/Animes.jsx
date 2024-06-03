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


// Component to display the anime list
const AnimeList = () => {
  const { loading, error, data } = useQuery(GET_USER_FAVORITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.Page.users[0]; // Assuming only one user is returned

  return (
    <div>
    <h1>{user.name}'s Favorite Anime</h1>
    <div className={styles.alist}>
      {user.favourites.anime.nodes.map((anime) => (
        <div key={anime.id} className={styles.acard}>
          <img src={anime.coverImage.extraLarge} alt={anime.title.english} />
          <p>{anime.title.english}</p>
        </div>
      ))}
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