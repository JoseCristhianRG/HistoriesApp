// PreviousStoriesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomModal from '../components/CustomModal'; // Importa el componente modal
import { getAllStories } from '../database/database';

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

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)} style={styles.storyItem}>
      <View style={styles.textContainer}>
        <Text style={styles.storyText}>{item.story.length > 50 ? item.story.substring(0, 50) + '...' : item.story}</Text>
      </View>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historias Anteriores</Text>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

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
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  storyText: {
    fontSize: 16,
    color: '#333',
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
});

export default PreviousStoriesScreen;
