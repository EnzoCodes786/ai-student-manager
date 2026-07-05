const express = require('express')
const sendQuizController = require('../controllers/sendQuiz.controller')
const router = express.Router()
const getUser = require('../middlewares/getUserMid')

router.post('sendQuiz',getUser,sendQuizController.sendQuiz)

module.exports = router;