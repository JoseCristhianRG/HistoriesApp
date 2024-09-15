import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono
import CustomModal from '../components/CustomModal'; // Importa el componente modal
import DeletedStoriesView from './DeletedStoriesScreen'; // Asegúrate de que esta ruta sea correcta
import { getAllStories, deleteStory } from '../database/database';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

import styles from "./styles/PreviousStoriesScreenStyles";

const PreviousStoriesScreen = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeletedStories, setShowDeletedStories] = useState(false);

  // Define loadStories function
  const loadStories = useCallback(async () => {
    const fetchedStories = await getAllStories();
    setStories(fetchedStories);
  }, []);

  // Use useFocusEffect to call loadStories when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadStories();
    }, [loadStories])
  );
  
  const openModal = (story) => {
    setIsLoading(true);
    setSelectedStory(story);
    setIsLoading(false); // Aquí puedes ajustar la lógica si realmente hay carga de datos
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  const handleDelete = async (id) => {
    try {
      let bool = await deleteStory(id);
      if (bool) {
        setStories(stories.filter(story => story.id !== id));
        Alert.alert('Éxito', 'La historia ha sido eliminada.');
      } else {
        Alert.alert('Error', 'No se pudo eliminar la historia.');
      }
    } catch (error) {
      console.error('Error al eliminar la historia', error);
      Alert.alert('Error', 'Hubo un problema al eliminar la historia.');
    }
  };

  const closeSectionDeletedHistories = () => {
    loadStories();
    setShowDeletedStories(!showDeletedStories);
  };

  const renderItem = ({ item }) => (
    <View style={styles.storyItem}>
      <TouchableOpacity onPress={() => openModal(item)} style={styles.textContainer}>
        <Text style={styles.storyTitle}>
          Palabras usadas: {item.title.length > 70 ? item.title.substring(0, 70) + '...' : item.title}
        </Text>

        {/* Texto de la historia */}
        <Text style={styles.storyText}>
          {item.story.length > 70 ? item.story.substring(0, 70) + '...' : item.story}
        </Text>

        {/* Contenedor para lenguaje y fecha */}
        <View style={styles.languageDateContainer}>
          <Text style={styles.languageText}>{item.language} -</Text>
          <Text style={styles.dateText}>{new Date(item.date).toLocaleString('es-ES')}</Text>
        </View>
      </TouchableOpacity>

      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
      ) : null}

      {/* Botón de eliminar */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Icon name="trash" size={20} color="#FF5733" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historias Anteriores</Text>
      { showDeletedStories ? 
        <DeletedStoriesView onClose={() => closeSectionDeletedHistories()} /> 
        : 
        (stories.length > 0 ? 
          <FlatList
            data={stories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          /> 
          : 
          <Text>Parece que aún no generaste ninguna historia...</Text> 
        )
      }

      <TouchableOpacity
        style={styles.showDeletedButton}
        onPress={() => closeSectionDeletedHistories()}
      >
        <Text style={styles.showDeletedButtonText}>Ver Historias {showDeletedStories ? '' : 'Eliminadas'}</Text>
      </TouchableOpacity>
      
      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        isLoading={isLoading}
        story={selectedStory?.story}
        imageUrl={selectedStory?.imageUrl}
      />
    </View>
  );
};

export default PreviousStoriesScreen;
