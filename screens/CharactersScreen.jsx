import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store';

const CharactersScreen = () => {
  const { navigate } = useNavigation();
  const { likedCharacters } = useStore();

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {likedCharacters.map((object, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigate('Character', { characterId: object.id })}
          >
            <Text style={styles.text}>{object.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CharactersScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    gap: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
