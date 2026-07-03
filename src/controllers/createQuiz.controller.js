const pool = require('../database/db')

async function createQuiz(req,res) {
    const user_id = req.user.user_id
    const {topic,exam,difficulty,numQuestions=10} = req.body;
    const [questions] = await pool.query(
        `
        SELECT  FROM 
        `
    )
}