const pool = require('../database/db')

async function sendQuiz(req,res) {
    const user_id = req.user.user_id;
    const { topic, exam, difficulty, numQuestions = 4 } = req.body;
    const [quizQuestions] = await pool.query(
      `SELECT 
        question_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d
       FROM question_model 
       WHERE topic = (?)
       AND exam = (?)
       AND difficulty = (?)
       ORDER BY RAND()
       LIMIT ?;`,
      [topic, exam, difficulty, numQuestions]
    );
    
    const [quiz_id] = await pool.query(
        `
        SELECT quiz_id FROM quiz_model
        WHERE user_id = (?)
        AND topic=(?)
        `
    ,[user_id,topic])
    res.json(
        {
            quizId:quiz_id,
            questions:quizQuestions
        }
    )
}

module.exports = {sendQuiz}