const express=require('express')
const router=express.Router()
const {getAllUsers,deleteUser,blockUser}=require('../../controllers/admin/userManagement')
const adminProtect=require('../../middleware/adminAuth')
const protect=require('../../middleware/authMiddleware')
const {addProduct}=require('../../controllers/admin/productManagement')
const upload=require('../../middleware/upload')
const {addCoupon,getCoupons}=require('../../controllers/admin/couponManagement')

router.get('/getUsers',protect,adminProtect,getAllUsers)
router.delete('/user/:id',protect,adminProtect,deleteUser)
router.put('/user/:id/block',protect,adminProtect,blockUser)

router.post('/addProduct',protect,adminProtect, upload.array('images',5),addProduct)

router.post('/addCoupon',protect,adminProtect,addCoupon)

router.get('/getCoupon',protect,adminProtect,getCoupons)

module.exports=router