const mongoose = require('mongoose');

const TempUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('TempUser', TempUserSchema);
