const express = require('express')
const router = express.Router()
const recieveAnswerController = require('../controllers/recieveAnswer.controller')
router.post('/sendAnswer/:qid/:questionId', recieveAnswerController.recieveAnswer)

module.exports = router