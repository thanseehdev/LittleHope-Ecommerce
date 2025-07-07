const express=require('express')
const router=express.Router()
const {getAllUsers,deleteUser,blockUser}=require('../../controllers/admin/userManagement')
const adminProtect=require('../../middleware/adminAuth')
const protect=require('../../middleware/authMiddleware')

router.get('/getUsers',protect,adminProtect,getAllUsers)
router.delete('/user/:id',protect,adminProtect,deleteUser)
router.put('/user/:id/block',protect,adminProtect,blockUser)

module.exports=router