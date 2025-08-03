const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Please log in to continue.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found. Please check your login.' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: 'Your account is not approved yet. Contact support.' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Your session has ended. Please log in again.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid login. Please log in again.' });
        }
        console.error('Token error:', error);
        return res.status(401).json({ message: 'Something went wrong. Please log in again.' });
    }
};

module.exports = protect;

