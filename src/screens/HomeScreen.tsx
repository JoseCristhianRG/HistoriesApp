import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Modo individual"
      onPress={() =>
        navigation.navigate('SingleStoryScreen', {name: 'Modo individual'})
      }
    />
  );
};

export default HomeScreen;
