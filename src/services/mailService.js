const { Resend } = require("resend");
async function sendOTP(email, otp) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const info = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "OTP Verification",
      html: `<h1>${otp}</h1>`,
    });

    console.log("Email Sent:", info.messageId);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = sendOTP;
