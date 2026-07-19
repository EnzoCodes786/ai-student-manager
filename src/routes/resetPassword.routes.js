const express = require('express')
const router  = express.Router()
const resetPasswordController = require('../controllers/resetPassword.controller')

router.post('/resetPassword',resetPasswordController.resetPassword)

module.exports = router
