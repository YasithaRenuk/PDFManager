const express = require('express')
const router = express.Router();

const {upload} = require('../helpers/file.helper')

const{singleFileUpload} = require("../controllers/PDFregister.controller");

router.post("/singalfile",upload.single('file'),singleFileUpload)




module.exports = router