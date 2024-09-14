import axios from 'axios';

const API_KEY = "API_KEY";

export const generateStory = async (text, length, gender, withImages) => {
  try {

    /* 
      // Código de ejemplo para pruebas 
      const ejemplo = `Erase una vez un caracol que estaba en el bosque y conoció a una mariposa.`;
      const ejemploImagen = `https://img.freepik.com/foto-gratis/disparo-vertical-enfoque-superficial-lindo-cachorro-golden-retriever-sentado-suelo-hierba_181624-27259.jpg`;
      let story = ejemplo;
      let imageUrl = ejemploImagen;
      await new Promise(r => setTimeout(r, 1500));
      return {story: ejemplo, imageUrl: withImages ? ejemploImagen : ''};
    */

    // Crear el mensaje para el modelo de generador de historias
    const prompt = `Genera una historia de ${gender} con principio y fin de unas ${length} palabras que se base en las siguientes palabras: ${text}
    Por favor, obvia las palabras que no sean reales, ejemplo: aaa, asdasd, etc`;

    const response = await axios.post(
      'https://api.openai.com/v1/completions', {
        model: "gpt-3.5-turbo-instruct", // Usa el modelo de chat más reciente
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let story = response.data.choices[0].text.trim();
    // Si se desea una imagen, realiza una solicitud adicional para generar la imagen
    if (withImages) {
      const imagePrompt = `Genera una imagen de dibujos que tenga que ver con esta historia: ${story}`;
      try {
        const imageResponse = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            prompt: imagePrompt.slice(0, 999),
            n: 1, // Número de imágenes a generar
            size: "256x256", // Tamaño de la imagen
          },
          {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        // Sacamos la URL de la imagen
        const imageUrl = imageResponse.data.data[0].url;
        return { story: story, imageUrl: imageUrl };
      } catch (error) {
        console.error("Error generating image:", error.response.data);
        // Devuelve la historia sin imagen si ocurre un error
        return { story: story, imageUrl: null };
      }
    }

    return {story: story, imageUrl: ''};
  } catch (error) {
    console.error("Error generating story:", error);
    return null;
  }
};
