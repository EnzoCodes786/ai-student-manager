async function generateOtp() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 9);
    otp += random;
  }
  return otp;
}

module.exports = generateOtp