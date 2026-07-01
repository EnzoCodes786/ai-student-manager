const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({});

async function runChat(user_input) {
  
  const turn1 = await ai.interactions.create({
    model: 'gemini-3.5-flash',
    input: user_input,
  });
  return turn1.output_text
  console.log('AI:', turn1.output_text);
}

module.exports = runChat