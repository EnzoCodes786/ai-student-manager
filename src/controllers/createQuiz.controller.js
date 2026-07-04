const pool = require("../database/db");

async function createQuiz(req, res) {
  const user_id = req.user.user_id;
  const { topic, exam, difficulty, numQuestions = 10 } = req.body;

  try {
    const [questions] = await pool.query(
      `SELECT * FROM question_model 
       WHERE topic = (?)
       AND exam = (?)
       AND difficulty = (?)
       ORDER BY RAND()
       LIMIT ?;`,
      [topic, exam, difficulty, numQuestions]
    );

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found for this criteria" });
    }

    const [quizResult] = await pool.query(
      `INSERT INTO quiz_model (user_id, topic, total_questions) VALUES (?, ?, ?)`,
      [user_id, topic, questions.length]
    );
    const quiz_id = quizResult.insertId;

    for (const q of questions) {
      await pool.query(
        `INSERT INTO quiz_questions (quiz_id, question_id) VALUES (?, ?)`,
        [quiz_id, q.question_id]
      );
    }

    res.status(201).json({ quiz_id, total_questions: questions.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating quiz" });
  }
}

module.exports = createQuiz;