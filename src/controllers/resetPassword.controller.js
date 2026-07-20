const pool = require("../database/db");
const jwt = require("jsonwebtoken");
const encryption = require("../middlewares/passEncryption");

async function resetPassword(req, res) {
    try {
        const { newPassword } = req.body || {};
        const resetPasswordToken = req.cookies.resetPasswordToken;

        if (!newPassword) {
            return res.status(400).json({ message: "Please enter new password" });
        }
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        if (!resetPasswordToken) {
            return res.status(400).json({ message: "Reset token is missing" });
        }

        let decoded;
        try {
            decoded = jwt.verify(resetPasswordToken, process.env.TOKEN_SECRET_KEY);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        if (decoded.purpose !== "reset") {
            return res.status(400).json({ message: "Invalid reset token" });
        }

        const user_email = decoded.email;
        const new_hashed_password = await encryption(newPassword);

        const [result] = await pool.query(
            `UPDATE user_model SET user_pass = ? WHERE user_email = ?`,
            [new_hashed_password, user_email]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Invalid reset token" });
        }

        res.clearCookie("resetPasswordToken");
        return res.status(202).json({ 
            message: "Password Changed Successfully",
            passwordEntered : newPassword,
            hashed : new_hashed_password
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { resetPassword };