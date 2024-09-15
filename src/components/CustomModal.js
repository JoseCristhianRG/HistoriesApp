// CustomModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';

const CustomModal = ({ visible, onClose, isLoading, story, imageUrl }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        {isLoading ? (
          <View style={styles.modalContainer}>
            <View style={styles.preloadContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.preloadText}>Generando historia... espere...</Text>
            </View>
          </View>
        ) : (
          <View style={styles.modalContainer}>
            <Text style={styles.storyTitle}>Historia Generada:</Text>
            <ScrollView style={styles.storyContainer}>
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.generatedImage} />
              ) : null}
              <Text style={styles.storyText}>{story}</Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};


import { Dimensions} from 'react-native';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  generatedImage: {
    width: '100%',
    height: 256, // Ajusta según tus necesidades
    resizeMode: 'contain',
    marginBottom: 7,
    borderRadius: 5,
  },
  preloadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo gris semi-transparente
  },
  preloadText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007BFF',
  },
  storyContainer: {
    flex: 1,
    marginTop: 10,
  },
  storyText: {
    color: '#777',
  },
  storyTitle: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo gris semi-transparente
  },
  modalContainer: {
    width: '100%',
    maxWidth: 600,
    height: screenHeight * 0.95, // 95% del alto de la pantalla
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomModal;
