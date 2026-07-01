const express = require('express')
const router = express.Router()
const getUser = require('../middlewares/getUserMid')
const chatBotController = require('../controllers/chatBot.controller');

router.post('/chatBot',getUser,chatBotController.chatBot)

module.exports = router