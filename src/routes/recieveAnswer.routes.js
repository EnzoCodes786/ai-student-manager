const express = require('express')
const router = express.Router()
const recieveAnswerController = require('../controllers/recieveAnswer.controller')
router.post('/sendAnswer/:qid',recieveAnswerController.recieveAnswer)

module.exports = router