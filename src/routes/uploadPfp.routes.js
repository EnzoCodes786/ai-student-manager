const express = require('express')
const router = express.Router()
const { upload } = require('../middlewares/cloudinary')
const getUserMid = require('../middlewares/getUserMid')
const uploadPfpController = require('../controllers/uploadPfp.controllers')
router.post('/postPfp', getUserMid, upload.single('pfp'), uploadPfpController.uploadPfp)
module.exports = router