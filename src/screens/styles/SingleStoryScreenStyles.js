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

});

export default styles;
