const express = require('express')
const router = express.Router();
const validateDto = require('../middleware/validate-dto.service')

const userSchema = require('../schema/user.schema')
const loginSchema = require('../schema/login.schema')

const{test,registerUser,loginUser} = require("../controllers/auth.controller");

router.get('/',test)
router.post("/register",validateDto(userSchema),registerUser)
router.post("/login",validateDto(loginSchema),loginUser)

module.exports = router