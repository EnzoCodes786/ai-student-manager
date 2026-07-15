const pool = require('../database/db')
const sendEmail = require('../services/emailService')
async function forgotPassword(req,res) {
    const {email} = req.body;
    
}

module.exports = {forgotPassword}