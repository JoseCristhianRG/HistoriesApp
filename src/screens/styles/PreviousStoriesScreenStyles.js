// 
import { StyleSheet} from 'react-native';

// Estilos básicos
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

export default styles;
