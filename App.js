import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Text, TouchableOpacity } from 'react-native';

const ScreenStack = createNativeStackNavigator();
const NavigationTopTabs = createMaterialTopTabNavigator();

import client from './apolloClient';

import MovieScreen from './screens/MovieScreen';
import CharacterScreen from './screens/CharacterScreen';
import EpisodeScreen from './screens/EpisodeScreen';
import CharactersScreen from './screens/CharactersScreen';

import { useStore } from './store';

export default function App() {
  const { changeSort } = useStore();

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <ScreenStack.Navigator>
          <ScreenStack.Screen
            name={'Home'}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={changeSort}>
                  <Text>Sort</Text>
                </TouchableOpacity>
              )
            }}
          >
            {() => (
              <NavigationTopTabs.Navigator>
                <NavigationTopTabs.Screen name={'Episode'} component={EpisodeScreen} />
                <NavigationTopTabs.Screen name={'Characters'} component={CharactersScreen} />
              </NavigationTopTabs.Navigator>
            )}
          </ScreenStack.Screen>
          <ScreenStack.Screen name={'Movie'} component={MovieScreen} />
          <ScreenStack.Screen name={'Character'} component={CharacterScreen} />
        </ScreenStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
