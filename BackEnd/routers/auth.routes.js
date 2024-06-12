const express = require('express')
const router = express.Router();
const validateDto = require('../middleware/validate-dto.service')

const registerSchema = require('../schema/register.schema')
const loginSchema = require('../schema/login.schema')

const{test,registerUser,loginUser} = require("../controllers/auth.controller");

router.get('/',test)
router.post("/register",validateDto(registerSchema),registerUser)
router.post("/login",validateDto(loginSchema),loginUser)

module.exports = router