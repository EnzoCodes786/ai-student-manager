const pool = require('../database/db')

async function getUserData(req,res) {
    const user_id = req.user.user_id;
    const data = await pool.query(`
        SELECT * FROM user_model 
        WHERE user_id = (?)
        `,[user_id])
    res.status(200).json({
        message : "User data fetched",
        user_data : data[0]
    })
}

module.exports = {getUserData}