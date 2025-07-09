const express = require('express')
const {register,verifyOTP,login,me}=require('../../controllers/user/authController')
const router=express.Router()
const protect=require('../../middleware/authMiddleware')
const {getNewArrivals, productDetails,getAllProducts }=require('../../controllers/user/productController')
const {getProfile}=require('../../controllers/user/profileController')

router.post('/register',register)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
//router.get('/me',protect,me)

router.get('/newArrivals',getNewArrivals )

router.get('/productDetail/:id',productDetails )

router.get('/getAllproducts',getAllProducts)

router.get('/profile',protect,getProfile)

module.exports = router;
