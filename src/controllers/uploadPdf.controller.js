const pool = require('../database/db')
const multer = require('multer')
const pdfparser = require('../services/pdfParser')
async function uploadPdf(req, res) {
    try {
        const pdfBuffer = req.file.buffer;
        const user_id = req.user.user_id;
        
        if (!pdfBuffer) {
            return res.json({ message: "Pdf not uploaded" })
        }
        
        const pdfData = await pdfparser(pdfBuffer)
        await pool.query(`
            INSERT INTO pdftext(user_id,pdf_text)
            VALUES(?,?)
            `, [user_id, pdfData])
        
        res.json({
            message: "Pdf Uploaded Successfully",
            data: pdfData
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = {uploadPdf}