const pool = require('../database/db')
async function uploadPfp(req, res) {
    try {
        const user_id = req.user.user_id
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' })
        }

        const imageUrl = req.file.path

        await pool.query(
            'UPDATE user_model SET user_image = ? WHERE user_id = ?',
            [imageUrl, user_id]
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