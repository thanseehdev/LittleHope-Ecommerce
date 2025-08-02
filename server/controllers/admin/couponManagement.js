const Coupon = require('../../models/couponModel')

const addCoupon = async (req, res) => {
    try { 
        const { code, discount, expiry } = req.body;

        if (!code || !discount || !expiry) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const coupon = new Coupon({
            code,
            discount,
            expiry
        });

        await coupon.save();

        res.status(201).json({ message: 'Coupon created successfully.' });
    } catch (error) {
        if (error.code === 11000) {
           
            return res.status(409).json({ message: 'Coupon code already exists.' });
        }
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
}


const getCoupons = async (req, res) => {
   try {
    
    const coupon = await Coupon.find().sort({ createdAt: -1 });
    
    res.status(200).json( coupon );
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
}

module.exports = {
    addCoupon,
    getCoupons
}