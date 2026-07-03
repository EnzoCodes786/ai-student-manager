const express = require('express')
const router = express.Router()
const getUser = require('../middlewares/getUserMid')
const createQuestionsController = require('../controllers/createQuestions.controller')

router.post('/createQuestions',getUser,createQuestionsController.createQuestions)

module.exports = router