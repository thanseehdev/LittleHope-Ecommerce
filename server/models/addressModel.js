const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  landmark: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    match: /^[1-9][0-9]{5}$/, // Regex for Indian PIN code (6 digits)
    trim: true
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Will automatically add createdAt and updatedAt fields
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
