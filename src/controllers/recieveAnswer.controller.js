const pool = require('../database/db')

async function recieveAnswer(req,res) {
    let score = 0;
    question_id = req.params.qid;
    const {user_answer} = req.body
    
    const questionAns = await pool.query(`
        SELECT correct_answer FROM question_model
        WHERE question_id = (?)
        `,[question_id])
    
    const correctAns = toString(questionAns)
    if(correctAns === user_answer){
        res.json("Correct Answer")
        score++;
    }
    else{
        res.json("Wrong Answer")
    }

}

module.exports = {recieveAnswer}