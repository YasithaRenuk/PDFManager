const express = require('express')
const router = express.Router();

const {upload} = require('../helpers/file.helper')
const {authenticateToken} = require("../middleware/jwt.service")


const{singleFileUpload} = require("../controllers/PDFregister.controller");

router.post("/singalfile",upload.single('file'),authenticateToken,singleFileUpload)




module.exports = router