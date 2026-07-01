const pool = require('../database/db')
const runChat = require('../services/googleAiText') 
async function chatBot(req,res) {
    const{user_prompt} = req.body;
    const user_id = req.user.user_id;
    const [rows] = await pool.query(`
        SELECT pdf_text FROM pdftext
        WHERE user_id = (?);
        `,[user_id])
    const extractedPdfText = rows[2].pdf_text
    const user_text = `Here is the document text: ${extractedPdfText} \n\n User request: ${user_prompt}`
    const ans = await runChat(user_text);
    res.json(ans);
}

module.exports = {chatBot}