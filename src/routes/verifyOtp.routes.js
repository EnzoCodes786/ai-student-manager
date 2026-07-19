const express = require('express')
const router = express.Router()
const verifyOtpController = require('../controllers/verifyOtp.controller')

router.post('/verifyOtp',verifyOtpController.verifyOtp)

module.exports = router