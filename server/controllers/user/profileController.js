const User = require('../../models/userModel')
const Coupon = require('../../models/couponModel')
const Address = require('../../models/addressModel')

const getProfile = async (req, res) => {
    try {

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
        const coupon = await Coupon.find().sort({ createdAt: -1 });

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}
const addAddress = async (req, res) => {
    try {
        const { name, landmark, city, zip, mobile } = req.body;

        const newAddress = new Address({
            fullName:name,
            landmark,
            city,
            zipCode:zip,
            mobileNo:mobile,
            user:req.user._id
        })
        const savedAddress = await newAddress.save();
        res.status(201).json({ success: true, message: "Address added successfully", savedAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to add address" })
    }
}

const getAddress = async (req, res) => {
    try {
  
        const addresses = await Address.find({user:req.user._id});

        res.status(200).json({ success: true, message: "Addresses fetched successfully", addresses })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to get address" })
    }
}

const deleteAddress = async (req, res) => {
    try {
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: "Addresses deleted successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to delete address" })
    }
}


module.exports = {
    getProfile,
    getCoupons,
    addAddress,
    getAddress,
    deleteAddress

}