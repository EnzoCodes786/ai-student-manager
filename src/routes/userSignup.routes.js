const express = require('express')
const router  = express.Router()

const userSignupController = require('../controllers/userSignup.controller')
router.post('/signUp',userSignupController.userSignup)

module.exports = router