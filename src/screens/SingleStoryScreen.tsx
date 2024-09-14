import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { generateStory } from '../api/openai'; // Aquí importas la función desde la carpeta api

const SingleStoryScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');

  const [wordsArray, setWordsArray] = useState([]);

  const handleGenerate = async () => {
    const result = await generateStory(prompt);
    setStory(result);
  };

  const saveWord = async () => {
    const result = prompt;
    wordsArray[wordsArray.length] = result;
    console.log = result;
  };

  return (
    <View>
      <TextInput
        placeholder="Inserta palabras con las que deseas generar una historia, 
        por ejemplo perro, zanahoria, coche..."
        value={prompt}
        onChangeText={setPrompt}
        onSubmitEditing={setWordsArray} 
      />
      <Button title="Generar Historia" onPress={handleGenerate} />
      {story ? <Text>{story}</Text> : null}
      {wordsArray ? <Text>{wordsArray}</Text> : null}
    </View>
  );
};

export default SingleStoryScreen;
