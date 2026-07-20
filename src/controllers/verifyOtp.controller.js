const pool = require("../database/db");
const jwt = require("jsonwebtoken");

async function verifyOtp(req, res) {
    try {
        const { otp } = req.body || {};
        const resetToken = req.cookies.resetToken;

        if (!resetToken) {
            return res.status(400).json({ message: "Reset token is missing" });
        }
        if (!otp) {
            return res.status(400).json({ message: "OTP is required" });
        }

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.TOKEN_SECRET_KEY);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        if (decoded.purpose !== "otp") {
            return res.status(400).json({ message: "Invalid token type" });
        }

        const email = decoded.email;

        const [rows] = await pool.query(
            `SELECT otp FROM otp_table WHERE email = ?`,
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (String(rows[0].otp) !== String(otp)) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        await pool.query(`DELETE FROM otp_table WHERE email = ?`, [email]);
        res.clearCookie("resetToken");

        const resetPasswordToken = jwt.sign(
            { email, purpose: "reset" },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "10m" }
        );

        res.cookie("resetPasswordToken", resetPasswordToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 60 * 1000,
        });

        return res.status(202).json({ message: "Otp verified" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { verifyOtp };