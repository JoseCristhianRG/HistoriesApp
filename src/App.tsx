import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import PreviousStoriesScreen from './screens/PreviousStoriesScreen';
import SingleStoryScreen from './screens/SingleStoryScreen';

import { initializeDatabase } from './database/database';

initializeDatabase();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{title: 'Bienvenido'}}
        />
        <Stack.Screen 
          name="PreviousStoriesScreen" 
          component={PreviousStoriesScreen} 
          options={{title: 'Ver historias anteriores'}}
        />
        <Stack.Screen 
          name="SingleStoryScreen" 
          component={SingleStoryScreen} 
          options={{title: 'Generar historia'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;