const User=require('../../models/userModel')
const { sendOTPEmail }=require('../../utils/sendEmail')
const generateToken =require('../../utils/generateToken')


export const register=async(req ,res)=>{
    const {name,email,password}=req.body

    const userExist=await User.findOne({email})
    if(userExist){
        return res.status(400).json({message:"User already exists"})
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const user=await User.create({
        name,
        email,
        password:await bcrypt.hash(password,10),
        otp,
        otpExpires: Date.now() + 10 * 60 * 1000,
    })
    console.log(`otp is ${otp}`)
    await sendOTPEmail(email,otp)
    res.status(201).json({ message: 'OTP sent to your email', email });
}

export const verifyOTP=async(req,res)=>{
    const {email,otp}=req.body
    
    const user=await User.findOne({email})
    if(!user||user.otp!==otp||user.otpExpires < Date.now()){
        res.status(400).json({message:"'Invalid or expired OTP' "})
    }
    console.log('otp entered successfull')
    user.isVerified=true
    user.otp=undefined
    user.otpExpires = undefined;

    await user.save()
    
    res.status(200).json({message:'otp successfull',token:generateToken(user._id),user})
}