const pool = require('../database/db')

async function getUserPass(user_name) {
    const [res] = await pool.query(
        `
        SELECT * FROM user_model
        WHERE user_name = (?)
        `
    ,[user_name]);
    console.log(res[0]);
    return res[0] || null
}

module.exports = getUserPass