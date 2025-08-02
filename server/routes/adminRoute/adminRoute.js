const express = require('express')
const router = express.Router()
const { getAllUsers, deleteUser, blockUser, unBlockUser } = require('../../controllers/admin/userManagement')
const adminProtect = require('../../middleware/adminAuth')
const protect = require('../../middleware/authMiddleware')
const { addProduct, fetchAllProducts, getEditProduct, updateProduct } = require('../../controllers/admin/productManagement')
const upload = require('../../middleware/upload')
const { addCoupon, getCoupons } = require('../../controllers/admin/couponManagement')
const { getAllOrder, getOrderDetails, updateOrderStatus } = require('../../controllers/admin/orderManagement')
const { getDashData } = require('../../controllers/admin/dashboardManagement')

router.get('/getUsers', protect, adminProtect, getAllUsers)
router.delete('/user/:id', protect, adminProtect, deleteUser)
router.put('/user/:id/block', protect, adminProtect, blockUser)
router.put('/user/:id/unBlock', protect, adminProtect, unBlockUser)

router.post('/addProduct', protect, adminProtect, upload.array('images', 5), addProduct)

router.post('/addCoupon', protect, adminProtect, addCoupon)

router.get('/getCoupon', protect, adminProtect, getCoupons)

router.get('/fetchAllProducts', protect, adminProtect, fetchAllProducts)

router.get('/getEditProduct/:id', protect, adminProtect, getEditProduct)

router.put('/updateProduct/:id', protect, adminProtect, upload.array('images'), updateProduct)

router.get('/getAllOrders', protect, adminProtect, getAllOrder)

router.get('/getOrderDetails/:id', protect, adminProtect, getOrderDetails)

router.put('/updateOrderStatus', protect, adminProtect, updateOrderStatus)

router.get('/getDashData', protect, adminProtect, getDashData)

module.exports = router