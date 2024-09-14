import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Button } from 'react-native';
// import HomeScreen from './screens/HomeScreen';
import SingleStoryScreen from './screens/SingleStoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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