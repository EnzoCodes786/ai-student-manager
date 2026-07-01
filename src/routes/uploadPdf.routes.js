const express = require('express')
const router = express.Router();
const getUser = require('../middlewares/getUserMid')
const upload = require('../middlewares/upload')
const uploadPdfController = require('../controllers/uploadPdf.controller')
router.post('/uploadPdf', upload.single('file'), getUser, uploadPdfController.uploadPdf)
module.exports = router