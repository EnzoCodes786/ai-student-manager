const pool = require('../database/db')

async function forgotPassword(req,res) {
    const {email} = req.body;

}

module.exports = {forgotPassword}