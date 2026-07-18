const pool = require("../database/db");
const createOtp = require("../services/otpGen");
const sendOTP = require("../services/mailService");
const jwt = require('jsonwebtoken')
async function forgotPassword(req, res) {
  const { email } = req.body;
  const otp = await createOtp();
  await sendOTP(email, otp);
  await pool.query(
    `
        INSERT INTO otp_table(otp,email)
        VALUES(?,?)
        `,
    [otp, email],
  );

  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.status(202).json({
    message: "Otp sent !",
    resetToken
  });
}

module.exports = { forgotPassword };
