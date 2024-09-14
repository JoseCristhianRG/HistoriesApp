import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Generador de Historias</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SingleStoryScreen')}
        >
          <Icon name="pencil" size={30} color="#fff" />
          <Text style={styles.buttonText}>Generar Historia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PreviousStoriesScreen')}
        >
          <Icon name="book" size={30} color="#fff" />
          <Text style={styles.buttonText}>Ver Historias Anteriores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Color de fondo
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centrar el texto
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espacio entre los botones
  },
  button: {
    backgroundColor: '#007BFF', // Color de fondo del botón
    padding: 15,
    borderRadius: 5,
    width: 170, // Ancho fijo para los botones
    height: 170, // Alto fijo para los botones
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column', // Para centrar icono y texto verticalmente
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 16,
    marginTop: 10, // Espacio entre el icono y el texto
  },
});

export default HomeScreen;
