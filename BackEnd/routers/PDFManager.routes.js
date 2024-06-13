const express = require('express')
const router = express.Router();

const {upload} = require('../helpers/file.helper')
const {authenticateToken} = require("../middleware/jwt.service")


const{singleFileUpload,getAllFilesByEmail,getAllFiles} = require("../controllers/PDFregister.controller");

router.post("/singalfile",authenticateToken,upload.single('file'),singleFileUpload)
router.get("/getallPDFbyEmail",authenticateToken,getAllFilesByEmail)
router.get("/getallPDFAdmin",authenticateToken,getAllFiles)

module.exports = router