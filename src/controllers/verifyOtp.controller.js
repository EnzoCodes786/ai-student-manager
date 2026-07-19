const pool = require('../database/db')
const jwt = require('jsonwebtoken')
async function verifyOtp(req,res) {
    const {resetToken,otp} = req.body;
    
    let email
    try {
        const decoded = jwt.verify(resetToken,process.env.TOKEN_SECRET_KEY)
        email = decoded.email
    } catch (error) {
        console.log(error)
    }
    const data = await pool.query(`
        SELECT otp FROM otp_table
        WHERE email = ?
        `,[email])

    
    if (data.length === 0) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    await pool.query(`DELETE FROM otp_table WHERE email = ?`, [email]);

    const resetPasswordToken = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, { expiresIn: '10m' });
    res.status(202).json({
        message:"Otp verified",
        resetPasswordToken
    })
    }
    
    module.exports = {verifyOtp}