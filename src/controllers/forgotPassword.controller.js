const pool = require('../database/db')
const createOtp = require('../services/otpGen')
const sendOTP = require('../services/mailService')
async function forgotPassword(req,res) {
    const {email} = req.body;
    const otp = await createOtp();
    await sendOTP(email,otp)
    
    res.status(202).json({
        message : "Otp sent !"
    })
}

module.exports = {forgotPassword}