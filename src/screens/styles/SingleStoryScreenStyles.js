// SingleStoryScreenStyles.js
import { StyleSheet, Dimensions} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

// Estilos básicos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateButton: {
    backgroundColor: '#28A745', // Verde para el botón de generar historia
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10, // Reducir el espacio entre la historia generada y el botón
  },
  generateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
  badge: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 5,
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
  storyTitle: {
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
  reopenButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  reopenButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

	storyLengthContainer: {
	  marginVertical: 10,
	  alignItems: 'center',
	},

	storyLengthText: {
	  fontSize: 16,
	  fontWeight: 'bold',
	  marginBottom: 5,
	},

	storyLengthButtonsContainer: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  width: '100%',
	},

	storyLengthButton: {
	  backgroundColor: '#e0e0e0',
	  padding: 10,
	  borderRadius: 5,
	  flex: 1,
	  marginHorizontal: 5,
	  alignItems: 'center',
	},

	storyLengthButtonSelected: {
	  backgroundColor: '#007BFF',
	},

	storyLengthButtonText: {
	  color: 'white',
	  fontWeight: 'bold',
	},

	optionsButtonsContainer: {
	  marginVertical: 10,
	  alignItems: 'center',
	},

	optionsButtonsText: {
	  fontSize: 16,
	  fontWeight: 'bold',
	  marginBottom: 5,
	},

	optionsButtonsButtonsContainer: {
	  flexDirection: 'row',
	  justifyContent: 'space-between',
	  width: '100%',
	},

	optionsButtonsButton: {
	  backgroundColor: '#e0e0e0',
	  padding: 10,
	  borderRadius: 5,
	  flex: 1,
	  marginHorizontal: 5,
	  alignItems: 'center',
	},

	optionsButtonsButtonSelected: {
	  backgroundColor: '#007BFF',
	},

	optionsButtonsButtonText: {
	  color: 'white',
	  fontWeight: 'bold',
	},

	generatedImage: {
	  width: '100%',
	  height: 256, // Ajusta según tus necesidades
	  resizeMode: 'cover',
	  marginBottom: 7,
	  borderRadius: 5,
	},

});

export default styles;
