const pool = require('../database/db')
const jwt = require('jsonwebtoken')
const encryption = require('../middlewares/passEncryption')

async function resetPassword(req, res) {
    try {
        const { resetPasswordToken, newPassword } = req.body || {}

        if (!newPassword) {
            return res.status(400).json({
                message: "Please enter new password"
            })
        }
        if (!resetPasswordToken) {
            return res.status(400).json({
                message: "Reset token is missing"
            })
        }

        const decoded = jwt.verify(resetPasswordToken, process.env.TOKEN_SECRET_KEY)
        const user_email = decoded.email
        const new_hashed_password = await encryption(newPassword)

        await pool.query(`
            UPDATE user_model
            SET user_pass = ?
            WHERE user_email = ?;
        `, [new_hashed_password, user_email])

        return res.status(202).json({
            message: "Password Changed Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Invalid or expired reset token"
        })
    }
}

module.exports = { resetPassword }