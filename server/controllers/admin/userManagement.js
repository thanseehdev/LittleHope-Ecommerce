const User=require('../../models/userModel')

const getAllUsers=async(req,res)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
    try {
        const totalUser = await User.countDocuments();
        const users=await User.find().select('-password').skip((page - 1) * limit).limit(limit);
        const totalPages = Math.ceil(totalUser / limit);
        res.status(200).json({users,totalPages})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

const deleteUser=async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'user deleted'})
    } catch (error) {
        res.status(500).json({message:"failed to delete user"})
    }
}

const blockUser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        user.isVerified=false
        await user.save()
        res.status(200).json({message:'user blocked'})
    } catch (error) {
        res.status(500).json({message:"error blocking user"})
    }
}

const unBlockUser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        user.isVerified=true;
        await user.save()
        res.status(200).json({message:'user unblocked'})
    } catch (error) {
        res.status(500).json({message:"error when unblocking user"})
    }
}

module.exports={
    getAllUsers,
    deleteUser,
    blockUser,
    unBlockUser
}