import axios from 'axios';

export const generateStory = async (prompt) => {
  try {
    const response = await axios.post(

      'https://api.openai.com/v1/completions',
      {
        model: "gpt-3.5-turbo-instruct", // Puedes usar otros modelos de OpenAI si prefieres
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer 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`, // Asegúrate de tener la clave de API en un archivo .env
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error generating story:", error);
    return null;
  }
};
