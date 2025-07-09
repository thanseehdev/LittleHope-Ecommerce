const User=require('../../models/userModel')

const getProfile=async(req,res)=>{
    try {
        console.log('inside profile controller');
        
        const user=await User.findById(req.user._id)
        if(user){
            res.status(200).json(user)
        }else{
            res.status(400).json({ message: "User not found" })
        }
    } catch (error) {
        console.log('profile controller error'+error)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports={
    getProfile
}