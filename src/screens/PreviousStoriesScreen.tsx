import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono
import CustomModal from '../components/CustomModal'; // Importa el componente modal
import { getAllStories, deleteStory } from '../database/database';

const PreviousStoriesScreen = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      const fetchedStories = await getAllStories();
      setStories(fetchedStories);
    };
    loadStories();
  }, []);

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
      { stories[0] ? 
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        /> 
        : 
        <Text>Parece que aún no generaste ninguna historia...</Text> 
      }
      
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  storyItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    position: 'relative', // Necesario para posicionar el botón de eliminar
  },
  textContainer: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: "bold",
  },
  storyText: {
    fontSize: 14,
    color: '#333',
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  languageDateContainer: {
    flexDirection: 'row', // Coloca el lenguaje y la fecha en una sola línea
    justifyContent: 'flex-start', // Alinea los elementos a la derecha
    marginTop: 10, // Espacio entre el texto de la historia y el lenguaje/fecha
  },
  languageText: {
    fontSize: 12, // Tamaño más pequeño para el lenguaje
    color: '#555', // Tono gris fuerte
    marginRight: 5, // Espacio entre el lenguaje y la fecha
  },
  dateText: {
    fontSize: 12, // Tamaño más pequeño para la fecha
    color: '#555', // Tono gris fuerte
  },
  deleteButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default PreviousStoriesScreen;
