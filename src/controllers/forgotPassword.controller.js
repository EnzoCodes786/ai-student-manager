const pool = require("../database/db");
const jwt = require("jsonwebtoken");
const otpGen = require("../services/otpGen");
const mailService = require("../services/mailService");

async function forgotPassword(req, res) {
    try {
        const { email } = req.body || {};

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const [users] = await pool.query(
            `SELECT user_email FROM user_model WHERE user_email = ?`,
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({ message: "No account found with this email" });
        }

        const otp = await otpGen();

        await pool.query(`DELETE FROM otp_table WHERE email = ?`, [email]);
        await pool.query(`INSERT INTO otp_table (email, otp) VALUES (?, ?)`, [email, otp]);

        await mailService(email, otp);

        const resetToken = jwt.sign(
            { email, purpose: "otp" },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "10m" }
        );

        res.cookie("resetToken", resetToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 60 * 1000,
        });

        return res.status(200).json({ message: "OTP sent to your email" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { forgotPassword };