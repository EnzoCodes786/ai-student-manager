const pool = require("../database/db");

async function recieveAnswer(req, res) {
  let score = 0;
  let isCorrect = false;
  question_id = req.params.qid;
  const { user_answer } = req.body;

  const questionAns = await pool.query(
    `
        SELECT correct_answer FROM question_model
        WHERE question_id = (?)
        `,
    [question_id],
  );

  const correctAns = questionAns[0][0].correct_answer;
  console.log(user_answer, typeof user_answer);
  console.log(correctAns, typeof correctAns);
  const result = await pool.query(
    `INSERT INTO quiz_questions(user_answer,is_correct)
     VALUES(?,?)`,
    [user_answer, isCorrect],
  );

  console.log(result);
  if (correctAns === Number(user_answer)) {
    res.json("Correct Answer");
    isCorrect = true;
    score++;
  } else {
    res.json("Wrong Answer");
  }
}

module.exports = { recieveAnswer };
