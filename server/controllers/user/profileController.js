const User = require('../../models/userModel')
const Coupon=require('../../models/couponModel')

const getProfile = async (req, res) => {
    try {
        console.log('inside profile controller');

        const user = await User.findById(req.user._id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "User not found" })
        }
    } catch (error) {
        console.log('profile controller error' + error)
        res.status(500).json({ message: "Server error" })
    }
}
const getCoupons = async (req, res) => {
    try {
        console.log('inside user fetchCoupon ');
        const coupon = await Coupon.find().sort({ createdAt: -1 });

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}


module.exports = {
    getProfile,
    getCoupons
}