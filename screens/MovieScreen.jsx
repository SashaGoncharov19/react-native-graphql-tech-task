import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import CharacterComponent from '../components/CharacterComponent';

const MovieScreen = ({ route }) => {
  const { movieId } = route.params;

  const query = gql`
        query Film {
            film(id: "${movieId}") {
                title
                releaseDate
                openingCrawl
                speciesConnection {
                    totalCount
                }
                planetConnection {
                    totalCount
                }
                vehicleConnection {
                    totalCount
                }
                characterConnection {
                    characters {
                        id
                        name
                    }
                }
            }
        }
    `;

  const { data, loading } = useQuery(query);

  if (loading) return <Text>Loading...</Text>;

  const { film } = data;

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.episodeTitle}>{film.title}</Text>
        <Text style={styles.episodeReleaseDate}>{film.releaseDate.toLocaleString()}</Text>
        <Text style={styles.episodeOpeningCrawl}>
          {film.openingCrawl.replace(/(\r\n|\n|\r)/gm, '')}
        </Text>
        <View style={styles.countRootWrapper}>
          <View style={styles.divider} />

          <View style={styles.countBoxWrapper}>
            <View style={styles.countWrapper}>
              <Text style={styles.countText}>Total Species Count</Text>
              <View style={styles.countBox}>
                <Text style={styles.countText}>{film.speciesConnection.totalCount}</Text>
              </View>
            </View>
            <View style={styles.countWrapper}>
              <Text style={styles.countText}>Total Planet Count</Text>
              <View style={styles.countBox}>
                <Text style={styles.countText}>{film.planetConnection.totalCount}</Text>
              </View>
            </View>
            <View style={styles.countWrapper}>
              <Text style={styles.countText}>Total Vehicle Count</Text>
              <View style={styles.countBox}>
                <Text style={styles.countText}>{film.vehicleConnection.totalCount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />
        </View>

        <Text style={{ ...styles.episodeTitle, textAlign: 'center' }}>Characters</Text>

        <View>
          {film.characterConnection.characters.map((character, index) => (
            <CharacterComponent character={character} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    gap: 5
  },
  episodeTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold'
  },
  episodeReleaseDate: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  episodeOpeningCrawl: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  countRootWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10
  },
  countBoxWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10
  },
  countWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  countBox: {
    width: 25,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.20)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  countText: {
    fontWeight: 'bold'
  },
  divider: {
    height: 1,
    backgroundColor: '#5B5FD1',
    width: '75%'
  }
});
