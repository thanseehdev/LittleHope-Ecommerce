const mongoose = require('mongoose');
require('dotenv').config();
const encodedPassword = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://littehope_dbUser:${encodedPassword}@littlehope-ecommerce.j1kapcz.mongodb.net/LittleHope-Ecommerce?retryWrites=true&w=majority&appName=LittleHope-Ecommerce`;

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB with Mongoose:', error);
        throw error;
    }
}

module.exports = { connectDB };
