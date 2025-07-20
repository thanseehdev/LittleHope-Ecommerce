const express = require('express')
const {register,verifyOTP,login,me,FPEmailOtp,verifyFPOTP,conFirmForgetPassword,logout}=require('../../controllers/user/authController')
const router=express.Router()
const protect=require('../../middleware/authMiddleware')
const {getNewArrivals, productDetails,getAllProducts }=require('../../controllers/user/productController')
const {getProfile,getCoupons,addAddress,getAddress,deleteAddress}=require('../../controllers/user/profileController')
const {addToCart,getCartItems,updateQuantity,removeFromCart}=require('../../controllers/user/cartController')
const {createOrder,getUserOrders,getSingleOrder,cancellOrder} =require('../../controllers/user/orderController')
const {addToWishlist,removeFromWish,getWishItem} =require('../../controllers/user/wishlistController')

router.post('/register',register)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
router.get('/me',protect,me)

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

router.post('/addToWishlist/:id',protect,addToWishlist)

router.delete('/removeWishItem/:productId',protect,removeFromWish)

router.get('/getWishItem',protect,getWishItem)

router.delete('/removeFromCart',protect,removeFromCart)

router.post('/FPEmailOtp',FPEmailOtp)

router.post('/verifyFPOTP',verifyFPOTP)

router.post('/conFirmForgetPassword',conFirmForgetPassword)

router.get('/logout',logout)


module.exports = router;
