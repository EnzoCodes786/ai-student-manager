const form_data = require('FormData')
import Mailgun from "mailgun.js"; 

async function sendEmail(email,otp) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "aef1116e39b5a9471f4a1b7de8cbcf45-9889a0ac-19d80d13",
    url:process.env.MAILGUN_BASE_URL
  });
  try {
    const data = await mg.messages.create("sandboxb4e70ceb965a431abd100ff6bb23bc76.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandboxb4e70ceb965a431abd100ff6bb23bc76.mailgun.org>",
      to: [`${email}`],
      subject: "OTP for verification",
      text: `\pYour OTP for the email is following\p${otp}\p`,
    });

    console.log(data); 
  } catch (error) {
    console.log(error); 
  }
}

module.exports = sendEmail;