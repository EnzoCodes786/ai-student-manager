const express = require('express')
const router = express.Router()
const getUser = require('../middlewares/getUserMid')
const quizController = require('../controllers/createQuiz.controller')

router.post('/createQuiz',getUser,quizController)

module.exports = router