const jwt=require('jsonwebtoken')
const User=require('../models/userModel')

const protect=async(req,res,next)=>{
    try {
        console.log('inside the protect')
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:'please login'})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password')
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        req.user=user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
}

module.exports=protect