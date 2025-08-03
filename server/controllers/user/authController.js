const User = require('../../models/userModel')
const { sendOTPEmail } = require('../../utils/sendEmail')
const generateToken = require('../../utils/generateToken')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists, please login" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        req.session.tempUser = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000
        };


        await sendOTPEmail(email, otp);
        res.status(201).json({ message: 'OTP sent to your email', email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const tempUser = req.session.tempUser;
        console.log(tempUser.eamil);


        if (!tempUser || tempUser.email !== email) {
            return res.status(400).json({ message: "No registration in progress for this email" });
        }

        if (tempUser.otp !== otp || tempUser.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }


        const newUser = await User.create({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password,
            isVerified: true,
        });

        req.session.tempUser = null;

        const token = generateToken(newUser._id, newUser.role);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });


        res.status(200).json({
            message: "OTP verified successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const resendOTP = async (req, res) => {

    const { email } = req.body;

    try {

        if (
            !req.session.tempUser ||
            req.session.tempUser.email !== email
        ) {
            return res.status(400).json({ message: 'Please Try Again Later.' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        req.session.tempUser.otp = otp;
        req.session.tempUser.otpExpires = Date.now() + 10 * 60 * 1000;

        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP resent to your email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while resending OTP' });
    }
};




const login = async (req, res) => {
    const { email, password } = req.body

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
            return res.status(400).json({ message: "Blocked by ADMIN" })
        }
        const token = generateToken(user._id, user.role)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
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

const FPEmailOtp = async (req, res) => {

    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not exist! Please register' });
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`otp is ${otp}`);

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendOTPEmail(email, otp);
        res.status(201).json({ message: 'OTP sent to your email' });

    } catch (error) {
        console.error('forgot password email otp error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const verifyFPOTP = async (req, res) => {
    const { email, otp } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" })
        }
        console.log('otp entered successfull')
        user.otp = undefined
        user.otpExpires = undefined;
        await user.save()
        res.status(201).json({ message: 'OTP verified successfully' });
    } catch (error) {

    }
}

const conFirmForgetPassword = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });
        const newPassword = await bcrypt.hash(password, 10)
        user.password = newPassword
        await user.save()
        res.status(200).json({ message: 'new password created successfull, please login' })
    } catch (error) {

    }
}

const logout = async (req, res) => {

    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    register,
    verifyOTP,
    resendOTP,
    login,
    me,
    FPEmailOtp,
    verifyFPOTP,
    conFirmForgetPassword,
    logout
}