const pool = require('../database/db')
const jwt = require('jsonwebtoken')
async function uploadPfp(req, res) {
    try {
        const user_id = req.user.user_id
        const pfpToken = req.cookies.pfpToken
        if(!pfpToken){
            return res.status(400).status.json({message : "pfpToken is missing"})
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }
        let file

        file = jwt.verify(pfpToken,process.env.TOKEN_SECRET_KEY)
        const user_email = file.user_email
        
        const imageUrl = req.file.path

        await pool.query(
            'UPDATE user_model SET user_image = ? WHERE user_email = ?',
            [imageUrl, user_email]
        )

        res.json({
            message: 'Image Uploaded',
            image: imageUrl
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = {uploadPfp}