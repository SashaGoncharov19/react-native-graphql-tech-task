import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import EpisodeComponent from '../components/EpisodeComponent';
import { useStore } from '../store';

const CharacterScreen = ({ route }) => {
  const { addFavouriteCharacter, likedCharacters, deleteFavouriteCharacter } = useStore();

  const { characterId } = route.params;

  const query = gql`
    query Person {
      person(id: "${characterId}") {
        name
        birthYear
        height
        mass
        homeworld {
          name
        }
        filmConnection {
          films {
            title
            id
            releaseDate
            openingCrawl
          }
        }
      }
    }
  `;

  const { data, loading } = useQuery(query);

  if (loading) return <Text>Loading...</Text>;

  const { person } = data;

  function checkIfCharacterFavourite() {
    return likedCharacters.find((object) => object.id === characterId);
  }

  const characterExist = checkIfCharacterFavourite();

  return (
    <ScrollView>
      <View style={styles.pageWrapper}>
        <TouchableOpacity
          style={styles.buttonFavourite}
          onPress={() =>
            !characterExist
              ? addFavouriteCharacter(person.name, characterId)
              : deleteFavouriteCharacter(person.name)
          }
        >
          <Text style={styles.buttonText}>
            {!characterExist ? 'Add to favourite' : 'Remove from favourite'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>Name: {person.name}</Text>
        <Text style={styles.text}>Birth Year: {person.birthYear}</Text>
        <Text style={styles.text}>Height: {person.height} cm</Text>
        <Text style={styles.text}>Mass: {person.mass ?? 'unknown'} kg</Text>
        <Text style={styles.text}>HomeWorld: {person.homeworld.name}</Text>
        <Text style={styles.text}>Movies has appeared in:</Text>
        {person.filmConnection.films.map((film, index) => (
          <EpisodeComponent episodeData={film} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default CharacterScreen;

const styles = StyleSheet.create({
  buttonFavourite: {
    width: '100%',
    height: 25,
    backgroundColor: '#C5C1ED',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
  pageWrapper: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
