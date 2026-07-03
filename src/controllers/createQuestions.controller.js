const generateQuizQuestions = require("../services/googleQuestions");
const pool = require("../database/db");

async function createQuestions(req, res) {
  const { topic, exam, difficulty, count } = req.body;
  const questions = await generateQuizQuestions(topic, exam, difficulty, count);
  const questionsArray = JSON.parse(questions);
  for (const q of questionsArray) {
    await pool.query(
      `
        INSERT INTO question_model(topic, exam, difficulty, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        topic,
        exam,
        difficulty,
        q.question_text,
        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,
        q.correct_answer,
        q.explanation,
      ],
    );
  }

  res.json();
}
module.exports = { createQuestions };
