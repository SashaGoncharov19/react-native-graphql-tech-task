import React from 'react';
import { Text, ScrollView } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import EpisodeComponent from '../components/EpisodeComponent';

import { useStore } from '../store';

const EpisodeScreen = () => {
  const request = gql`
    query AllFilms {
      allFilms {
        films {
          title
          releaseDate
          openingCrawl
          id
        }
      }
    }
  `;

  const { data, loading } = useQuery(request);
  const { sort } = useStore();

  if (loading) return <Text>Loading...</Text>;

  const films = [...data.allFilms.films];

  const sortedFilms = films.sort((a, b) => {
    if (sort) {
      return a.releaseDate > b.releaseDate ? 1 : -1;
    } else {
      return a.releaseDate < b.releaseDate ? 1 : -1;
    }
  });

  return (
    <ScrollView>
      {sortedFilms.map((episode, index) => (
        <EpisodeComponent episodeData={episode} key={index} />
      ))}
    </ScrollView>
  );
};

export default EpisodeScreen;
