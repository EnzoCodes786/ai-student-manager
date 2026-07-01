const pool = require('../database/db')
const encrypt_password = require('../middlewares/passEncryption')
const date = new Date()
async function userSignup(req,res) {
    const {user_name,user_email,user_pass,user_exam} = req.body;
    const password =await encrypt_password(user_pass);
   const data= await pool.query(`
        INSERT INTO user_model(user_name,user_email,user_pass,user_exam,created_at)
        VALUES (?,?,?,?,?);
        `,[user_name,user_email,password,user_exam,date]);
    res.json({
        message:"User registered ",
        data : data[0]
    })
}
module.exports = {userSignup}
