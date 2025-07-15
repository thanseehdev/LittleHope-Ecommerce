const express = require('express')
const {register,verifyOTP,login,me}=require('../../controllers/user/authController')
const router=express.Router()
const protect=require('../../middleware/authMiddleware')
const {getNewArrivals, productDetails,getAllProducts }=require('../../controllers/user/productController')
const {getProfile,getCoupons,addAddress,getAddress,deleteAddress}=require('../../controllers/user/profileController')
const {addToCart,getCartItems,updateQuantity}=require('../../controllers/user/cartController')
const {createOrder,getUserOrders,getSingleOrder,cancellOrder} =require('../../controllers/user/orderController')

router.post('/register',register)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
//router.get('/me',protect,me)

router.get('/newArrivals',getNewArrivals )

router.get('/productDetail/:id',productDetails )

router.get('/getAllproducts',getAllProducts)

router.get('/profile',protect,getProfile)

router.get('/coupon',getCoupons)

router.post('/addAddress',protect,addAddress)

router.get('/getAddress',protect,getAddress)

router.delete('/deleteAddress/:id',protect,deleteAddress)

router.post('/addToCart',protect,addToCart)

router.get('/getCartItems',protect,getCartItems)

router.put('/updateItemQuantity',protect,updateQuantity)

router.post('/createOrder',protect,createOrder)

router.get('/getOrders',protect,getUserOrders)

router.get('/orderDetails/:id',protect,getSingleOrder)

router.put('/cancellOrder/:id',protect,cancellOrder)

module.exports = router;
