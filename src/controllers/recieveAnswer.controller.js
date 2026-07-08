const pool = require("../database/db");

async function recieveAnswer(req, res) {
  let score = 0;
  question_id = req.params.questionId;
  quiz_id = req.params.qid;
  const { user_answer } = req.body;

  const questionAns = await pool.query(
    `
        SELECT correct_answer FROM question_model
        WHERE question_id = (?)
        `,
    [question_id],
  );

  const correctAns = questionAns[0][0].correct_answer;
  const isCorrect = Number(correctAns) === Number(user_answer);
  await pool.query(
    `UPDATE quiz_questions
     SET user_answer = ?, is_correct = ?
     WHERE quiz_id = ? AND question_id = ?`,
    [user_answer, isCorrect, quiz_id, question_id],
  );

  
  if (isCorrect) {
    await pool.query(
      `UPDATE quiz_model SET score = score + 1 WHERE quiz_id = ?`,
      [quiz_id]
    );
    return res.json("Correct Answer");
  }
  res.json("Wrong Answer");

}

module.exports = { recieveAnswer };
