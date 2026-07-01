const express = require('express')
const router = express.Router()
const getUser = require('../middlewares/getUserMid')
const getUserController = require('../controllers/getUser.controllers');

router.get('/getUser',getUser,getUserController.getUserData);

module.exports = router