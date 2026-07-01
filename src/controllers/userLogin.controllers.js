const pool = require("../database/db");
const getUserPass = require("../middlewares/getUserPass");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
const bcrypt = require("bcrypt");
async function userLogin(req, res) {
  const { user_name, user_pass } = req.body;
  const userPass = await getUserPass(user_name);
  if (!userPass) {
    res.status(404).json({
      message: "User Note found",
    });
  } else {
    const isMatch = await bcrypt.compare(user_pass, userPass.user_pass);
    if (isMatch) {
      const token = jwt.sign(
        {
          user_id: userPass.user_id,
          user_email: userPass.user_email,
          user_name: userPass.user_name,
          user_exam: userPass.user_exam,
          user_streak: userPass.user_streak,
          user_image: userPass.user_image,
        },
        process.env.TOKEN_SECRET_KEY,
        {
          expiresIn: "7d",
        },
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({
        message:"User Login Successful"
      })
    }
    else {
        res.json({
            message : "Wrong Password"
        })
    }
  }
}

module.exports = {userLogin}
