import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import PreviousStoriesScreen from './screens/PreviousStoriesScreen';
import SingleStoryScreen from './screens/SingleStoryScreen';
import { View, StyleSheet } from 'react-native';

import { initializeDatabase } from './database/database';

initializeDatabase();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SingleStoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SingleStoryScreen"
      component={SingleStoryScreen}
      options={{ title: 'Generar historia' }}
    />
  </Stack.Navigator>
);

const PreviousStoriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="PreviousStoriesScreen"
      component={PreviousStoriesScreen}
      options={{ title: 'Historias anteriores' }}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'PreviousStories') {
                iconName = 'book';
              } else if (route.name === 'GenerateStory') {
                iconName = 'pencil';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarItemStyle: {
              paddingVertical: 5,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              paddingBottom: 0,
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="GenerateStory" component={SingleStoryScreen} options={{ title: 'Generar Historia' }} />
          <Tab.Screen name="PreviousStories" component={PreviousStoriesStack} options={{ headerShown: false, title: 'Historias Anteriores' }} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0, // Ajusta el padding inferior aquí
  },
});

export default App;
