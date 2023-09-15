import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CharacterComponent = ({ character }) => {
  const { id, name } = character;
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate('Character', { characterId: id })}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CharacterComponent;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 2,
    textAlign: 'center'
  }
});
