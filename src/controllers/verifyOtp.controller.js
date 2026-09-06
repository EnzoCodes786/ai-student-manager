const jwt = require("jsonwebtoken");
const redis = require("../config/redis");
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
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    if (decoded.purpose !== "otp") {
      return res.status(400).json({ message: "Invalid token type" });
    }

    const email = decoded.email;

    const storedOTP = await redis.get(`otp:${email}`);

    if (!storedOTP) {
      return res.status(400).json({
        message: "OTP expired or invalid",
      });
    }
    if (storedOTP !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    await redis.del(`otp:${email}`);
    res.clearCookie("resetToken");

    const resetPasswordToken = jwt.sign(
      { email, purpose: "reset" },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "10m" },
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
