const express = require('express')
const router = express.Router()
const userLoginController = require('../controllers/userLogin.controllers')

router.post('/login',userLoginController.userLogin)

module.exports = router