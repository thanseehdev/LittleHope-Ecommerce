const User = require('../../models/userModel')
const { sendOTPEmail } = require('../../utils/sendEmail')
const generateToken = require('../../utils/generateToken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { name, email, password } = req.body
    console.log('inside register controller')
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            console.log('user exist')
            return res.status(400).json({ message: "User already exists, please login" })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()

        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000,
        })
        console.log(`otp is ${otp}`)
        await sendOTPEmail(email, otp)
        res.status(201).json({ message: 'OTP sent to your email', email });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


const verifyOTP = async (req, res) => {
    const { email, otp } = req.body
    console.log('inside verify otp');
    try {
        const user = await User.findOne({ email })
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }
        console.log('otp entered successfull')
        user.isVerified = true
        user.otp = undefined
        user.otpExpires = undefined;
        await user.save()

        const token = generateToken(user._id, user.role)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax', // Or 'Strict' / 'None'
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: "OTP verified successfully", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body
    console.log('inside login')
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'invalid email or password' })
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: "user is not verified" })
        }
        const token = generateToken(user._id, user.role)
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax', // Or 'Strict' / 'None'
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({
            message: 'Login successful', user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const me = async (req, res) => {
    const user = req.user
    res.status(200).json({
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}

module.exports = {
    register,
    verifyOTP,
    login,
    me
}