const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({});

async function generateQuizQuestions(topic, exam, difficulty, count) {
  const prompt = `Generate ${count} multiple choice questions on topic "${topic}" 
for exam "${exam}" at "${difficulty}" difficulty level.

Return ONLY a valid JSON array, no extra text, no markdown formatting, no explanations outside the JSON. Exact structure:

[
  {
    "question_text": "...",
    "option_a": "...",
    "option_b": "...",
    "option_c": "...",
    "option_d": "...",
    "correct_answer": 1,
    "explanation": "..."
  }
]

correct_answer must be an integer 1, 2, 3, or 4 corresponding to option_a, option_b, option_c, option_d.`;

  const turn1 = await ai.interactions.create({
    model: 'gemini-3.5-flash',
    input: prompt,
  });

  console.log('AI raw response:', turn1.output_text);
  return turn1.output_text;
}

module.exports = generateQuizQuestions;