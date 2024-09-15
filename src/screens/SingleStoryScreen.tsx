import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, Modal, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { generateStory } from '../api/openai'; // Asegúrate de tener esta llamada al servicio de IA
import styles from './styles/SingleStoryScreenStyles';
import CustomModal from '../components/CustomModal'; // Importa el componente modal

const SingleStoryScreen = () => {
  const [word, setWord] = useState('');
  const [wordsArray, setWordsArray] = useState([]);
  const [generatedStory, setGeneratedStory] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [storyLength, setStoryLength] = useState(200); // Longitud predeterminada de la historia
  const [storyLanguage, setStoryLanguage] = useState("Español"); // Idioma predeterminado de la historia
  const [storyGenre, setStoryGenre] = useState('Fantasía'); // Género predeterminado de la historia
  const [withImages, setWithImages] = useState(0); // Género predeterminado de la historia
  const [arrayGenderOptions] = useState(['Amor', 'Fantasía', 'Miedo', 'Risa']);
  const [arrayLengthOptions] = useState([200,350,500]);
  const [arrayLanguageOptions] = useState(["Español","English","Deutch","French"]);
 
  // Función para agregar la palabra al array con validaciones
  const addWord = () => {
    const trimmedWord = word.trim();
    if (!trimmedWord || /\s/.test(trimmedWord) || !/^[a-zA-Z]+$/.test(trimmedWord) || wordsArray.includes(trimmedWord)) {
      Alert.alert('Parece que hay alguno de los siguientes errores: ', 
        '- No puedes añadir una palabra vacía. \r\n' +
        '- Solo se permite una palabra cada vez. \r\n' +
        '- Solo se permiten letras. \r\n' +
        '- No puedes añadir palabras duplicadas. \r\n'
      );
      return;
    }
    setWordsArray([...wordsArray, trimmedWord]);
    setWord('');
  };

  // Función para eliminar una palabra del array
  const removeWord = (wordToRemove) => {
    setWordsArray(wordsArray.filter((item) => item !== wordToRemove));
  };

  // Función para generar la historia usando la API
  const botonGenerateStory = async () => {
    if (wordsArray.length === 0) {
      Alert.alert('Error', 'Debes añadir al menos una palabra.');
      return;
    }
    setIsLoading(true);
    setModalVisible(true);
    const prompt = wordsArray.join(', '); // Convierte el array de palabras en una cadena
    try {
      const response = await generateStory(prompt, storyLength, storyGenre, withImages, storyLanguage); // Enviar longitud y género de la historia
      setGeneratedStory(response.story);
      setGeneratedImage(response.imageUrl);
      console.log(response);
    } catch (error) {
      console.error('Error generando la historia', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar la selección de la longitud de la historia
  const selectStoryLength = (length) => {
    setStoryLength(length);
  };

  // Función para manejar la selección del idioma de la historia
  const selectStoryLanguage = (language) => {
    setStoryLanguage(language);
  };

  // Función para manejar la selección del género de la historia
  const selectStoryGenre = (genre) => {
    setStoryGenre(genre);
  };

  // Función para manejar la selección del género de la historia
  const selectWithImages = (images) => {
    setWithImages(images);
  };

  lengthOptions = arrayLengthOptions.map(info => (
    <TouchableOpacity style={[styles.optionsButtonsButton, storyLength === info && styles.optionsButtonsButtonSelected]} onPress={() => selectStoryLength(info)}>
      <Text style={styles.optionsButtonsButtonText}>{info} palabras</Text>
    </TouchableOpacity>
  ));

  languageOptions = arrayLanguageOptions.map(info => (
    <TouchableOpacity style={[styles.optionsButtonsButton, storyLanguage === info && styles.optionsButtonsButtonSelected]} onPress={() => selectStoryLanguage(info)}>
      <Text style={styles.optionsButtonsButtonText}>{info}</Text>
    </TouchableOpacity>
  ));

  genderOptions = arrayGenderOptions.map(info => (
    <TouchableOpacity
      style={[styles.optionsButtonsButton, storyGenre === info && styles.optionsButtonsButtonSelected]}
      onPress={() => selectStoryGenre(info)}>
      <Text style={styles.optionsButtonsButtonText}>{info}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      {/* Input de texto y botón de añadir palabra */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una palabra"
          value={word}
          onChangeText={setWord}
          onSubmitEditing={addWord}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addWord}>
          <Icon name="plus" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Lista de palabras agregadas */}
      <View style={styles.wordsContainer}>
        {wordsArray.map((item) => (
          <TouchableOpacity key={item} style={styles.badgeContainer} onPress={() => removeWord(item)}>
            <Text style={styles.badge}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Opciones de longitud de la historia */}
      <View style={styles.optionsButtonsContainer}>
        <Text style={styles.optionsButtonsText}>Selecciona la longitud de la historia:</Text>
        <View style={styles.optionsButtonsButtonsContainer}>
          {lengthOptions}
        </View>
      </View>

      {/* Opciones de género de la historia */}
      <View style={styles.optionsButtonsContainer}>
        <Text style={styles.optionsButtonsText}>Selecciona el género de la historia:</Text>
        <View style={styles.optionsButtonsButtonsContainer}>
          {genderOptions}
        </View>
      </View>

      {/* Opciones de género de la historia */}
      <View style={styles.optionsButtonsContainer}>
        <Text style={styles.optionsButtonsText}>Selecciona el idioma de la historia:</Text>
        <View style={styles.optionsButtonsButtonsContainer}>
          {languageOptions}
        </View>
      </View>

      {/* Opciones para que la historia tenga imágenes o no */}
      <View style={styles.optionsButtonsContainer}>
        <Text style={styles.optionsButtonsText}>¿Quieres que tu historia tenga imágenes?</Text>
        <View style={styles.optionsButtonsButtonsContainer}>
          <TouchableOpacity
            style={[styles.optionsButtonsButton, withImages === 1 && styles.optionsButtonsButtonSelected]}
            onPress={() => selectWithImages(1)}
          >
            <Text style={styles.optionsButtonsButtonText}>Si</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionsButtonsButton, withImages === 0 && styles.optionsButtonsButtonSelected]}
            onPress={() => selectWithImages(0)}
          >
            <Text style={styles.optionsButtonsButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botón para generar la historia */}
      <TouchableOpacity
        style={styles.generateButton}
        onPress={botonGenerateStory}
        disabled={isLoading || wordsArray.length === 0}
      >
        <Text style={styles.generateButtonText}>
          {isLoading ? 'Generando...' : 'Generar Historia'}
        </Text>
      </TouchableOpacity>

      {/* Botón para volver a ver la historia */}
      {generatedStory ? (
        <TouchableOpacity
          style={styles.reopenButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.reopenButtonText}>Volver a leer la historia</Text>
        </TouchableOpacity>
      ) : null}

      {/* Componente de Modal para mostrar la historia */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isLoading={isLoading}
        story={generatedStory}
        imageUrl={generatedImage}
      />
    </View>
  );
};

export default SingleStoryScreen;
