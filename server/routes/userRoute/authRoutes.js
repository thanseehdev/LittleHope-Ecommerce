const express = require('express')
const {register,verifyOTP,login,me}=require('../../controllers/user/authController')
const router=express.Router()
const protect=require('../../middleware/authMiddleware')

router.post('/register',register)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
router.get('/me',protect,me)

module.exports = router;
