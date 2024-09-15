import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAllDeleteStories, restoreDeleteStories } from '../database/database'; // Asegúrate de tener esta función en tu base de datos
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

const DeletedStoriesView = ({ onClose }) => {
  const [deletedStories, setDeletedStories] = useState([]);

  // Define loadDeletedStories function
  const loadDeletedStories = useCallback(async () => {
    const fetchedDeletedStories = await getAllDeleteStories();
    setDeletedStories(fetchedDeletedStories);
  }, []);

  // Use useFocusEffect to call loadDeletedStories when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadDeletedStories();
    }, [loadDeletedStories])
  );

  const handleRestore = async (id) => {
    try {
      // Implementa la función de restauración aquí
      // Por ejemplo, podrías mover la historia de eliminado a activa en la base de datos
      // Y después actualizar la lista
      await restoreDeleteStories(id);
      const fetchedDeletedStories = await getAllDeleteStories();
      setDeletedStories(fetchedDeletedStories);
      Alert.alert('Éxito', 'La historia ha sido restaurada.');
    } catch (error) {
      console.error('Error al restaurar la historia', error);
      Alert.alert('Error', 'Hubo un problema al restaurar la historia.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.deletedStoryItem}>
      <Text style={styles.deletedStoryText}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleRestore(item.id)} style={styles.restoreButton}>
        <Text style={styles.restoreButtonText}>Restaurar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.deletedStoriesContainer}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
      <FlatList
        data={deletedStories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deletedStoriesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  deletedStoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deletedStoryText: {
    fontSize: 16,
    color: '#333',
  },
  restoreButton: {
    backgroundColor: '#FF5733',
    padding: 5,
    borderRadius: 5,
  },
  restoreButtonText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default DeletedStoriesView;
