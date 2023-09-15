import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EpisodeComponent = ({ episodeData }) => {
  const { navigate } = useNavigation();

  const formattedText = episodeData.openingCrawl.replace(/(\r\n|\n|\r)/gm, '').substring(0, 50);

  return (
    <TouchableOpacity
      style={styles.episodeRoot}
      onPress={() => navigate('Movie', { movieId: episodeData.id })}
    >
      <Text style={styles.episodeTitleText}>{episodeData.title}</Text>
      <Text style={styles.episodeOpeningCrawlText}>
        {formattedText}...
      </Text>
      <Text style={styles.episodeReleasedText}>{episodeData.releaseDate.toLocaleString()}</Text>
    </TouchableOpacity>
  );
};

export default EpisodeComponent;

const styles = StyleSheet.create({
  episodeRoot: {
    height: 80,
    marginTop: 5,
    marginBottom: 5,
    gap: 3,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#4169E1',
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    paddingLeft: 10
  },
  episodeTitleText: {
    fontSize: 20,
    color: 'white'
  },
  episodeReleasedText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    paddingRight: 10
  },
  episodeOpeningCrawlText: {
    fontSize: 16,
    color: 'white'
  }
});
